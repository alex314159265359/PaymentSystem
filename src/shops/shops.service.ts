import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { ShopsModel } from './shops.model';
import { PaymentsModel, PaymentStatus } from '../payments/payments.model';
import { SystemSettingsModel } from '../system/system-settings.model';
import sequelize, { Op, Sequelize } from 'sequelize';
import * as _ from 'lodash';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(ShopsModel) private shopsModel: typeof ShopsModel,
    @InjectModel(PaymentsModel) private paymentsModel: typeof PaymentsModel,
    @InjectModel(SystemSettingsModel)
    private systemSettingsModel: typeof SystemSettingsModel,
    @InjectConnection()
    private sequelize: Sequelize,
  ) {}

  async createShop(body: CreateShopDto) {
    const shop = await this.shopsModel.create(body);
    return { id: shop.id };
  }

  async createPayment(shopId: number, amount: number) {
    const shop = await this.shopsModel.findOne({
      where: { id: shopId },
      raw: true,
    });

    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    const systemCommissions = await this.systemSettingsModel.findOne({
      where: { key: 'commissions' },
      raw: true,
    });

    const commissionAmount =
      (systemCommissions?.attrs?.a ?? 0) +
      amount * (systemCommissions?.attrs?.b ?? 0) +
      amount * shop.commission;

    const lockedAmount = (systemCommissions.attrs?.d ?? 0) * amount;

    const payment = await this.paymentsModel.create({
      shopId,
      amount,
      commissionAmount,
      lockedAmount,
      status: PaymentStatus.received,
    });
    return { id: payment.id };
  }

  async payout(id: number) {
    return this.sequelize.transaction(async (transaction) => {
      const shop = await this.shopsModel.findByPk(id, { transaction });

      if (!shop) {
        throw new NotFoundException('Shop not found');
      }

      const availableSum: PaymentsModel = await this.paymentsModel.findOne({
        attributes: [
          [
            Sequelize.literal(
              `
            SUM(CASE WHEN "status" = 'processed' THEN "amount" - "commissionAmount" - "lockedAmount" ELSE 0 END) + 
            SUM(CASE WHEN "status" = 'completed' THEN "amount" - "commissionAmount" ELSE 0 END) -
            SUM(CASE WHEN "status" = 'paid' THEN "lockedAmount" ELSE 0 END)
            `,
            ),
            'amount',
          ],
        ],
        where: {
          shopId: shop.id,
          status: {
            [Op.in]: [
              PaymentStatus.completed,
              PaymentStatus.processed,
              PaymentStatus.paid,
            ],
          },
        },
        group: ['shopId'],
        raw: true,
        transaction,
      });

      const availableForPayout = await this.sequelize.query(
        `
        WITH PaymentCTE AS (
          SELECT 
            "id",
            "amount" - "commissionAmount" AS "amountWithoutCommission",
            SUM("amount" - "commissionAmount") OVER (ORDER BY "id") AS "total"
          FROM
            "PaymentsModels"
          WHERE
            "status" IN ('processed', 'completed')
        )
        SELECT 
          "id",
          "amountWithoutCommission" AS "amount",
          "total"
        FROM 
          PaymentCTE
        WHERE 
          "total" <= ${availableSum?.amount ?? 0}
        ORDER BY "id"
      `,
        {
          type: sequelize.QueryTypes.SELECT,
          model: PaymentsModel,
          mapToModel: true,
          raw: true,
          transaction,
        },
      );

      await this.paymentsModel.update(
        { status: PaymentStatus.paid },
        {
          where: { id: { [Op.in]: availableForPayout.map((p) => p.id) } },
          transaction,
        },
      );

      for (const payment of availableForPayout) {
        console.log(payment);
      }

      return {
        totalPayout: availableForPayout.reduce(
          (total, payment) => total + +payment.amount,
          0,
        ),
        payments: availableForPayout.map((p) => _.omit(p, 'total')),
      };
    });
  }
}
