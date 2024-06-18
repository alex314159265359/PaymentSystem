import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentsModel, PaymentStatus } from './payments.model';
import { StatusChangeEnum } from './status-change.enum';
import { Op } from 'sequelize';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(PaymentsModel) private paymentsModel: typeof PaymentsModel,
  ) {}

  async setStatus(ids: number[], status: StatusChangeEnum) {
    const whereStatus =
      status === StatusChangeEnum.processed
        ? PaymentStatus.received
        : PaymentStatus.processed;

    await this.paymentsModel.update(
      {
        status,
        ...(status === StatusChangeEnum.completed && { lockedAmount: 0 }),
      },
      { where: { id: { [Op.in]: ids }, status: whereStatus } },
    );
  }
}
