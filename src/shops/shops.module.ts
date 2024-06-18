import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShopsModel } from './shops.model';

@Module({
  imports: [SequelizeModule.forFeature([ShopsModel])],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
