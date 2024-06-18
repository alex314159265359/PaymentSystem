import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ShopsModel } from './shops.model';
import { PaymentsModel, PaymentStatus } from '../payments/payments.model';
import { SystemSettingsModel } from '../system/system-settings.model';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(ShopsModel) private shopsModel: typeof ShopsModel,
    @InjectModel(PaymentsModel) private paymentsModel: typeof PaymentsModel,
    @InjectModel(SystemSettingsModel)
    private systemSettingsModel: typeof SystemSettingsModel,
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
}
