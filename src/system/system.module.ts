import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SystemSettings } from './system-settings.model';

@Module({
  imports: [SequelizeModule.forFeature([SystemSettings])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
