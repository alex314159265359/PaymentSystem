import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsModel } from './payments.model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentsModel])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
