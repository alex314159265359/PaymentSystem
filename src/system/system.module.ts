import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SystemSettingsModel } from './system-settings.model';

@Module({
  imports: [SequelizeModule.forFeature([SystemSettingsModel])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
