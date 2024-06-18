import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShopsModel } from './shops.model';
import { PaymentsModel } from '../payments/payments.model';
import { SystemSettingsModel } from '../system/system-settings.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ShopsModel,
      PaymentsModel,
      SystemSettingsModel,
    ]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
