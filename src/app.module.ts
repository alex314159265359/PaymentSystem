import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SystemSettings } from './system/system-settings.model';
import { ConfigModule } from '@nestjs/config';
import { ShopsModule } from './shops/shops.module';
import { PaymentsModule } from './payments/payments.module';
import { ShopsModel } from './shops/shops.model';
import { PaymentsModel } from './payments/payments.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DBNAME,
      models: [SystemSettings, ShopsModel, PaymentsModel],
      logging: console.log,
      synchronize: true,
      autoLoadModels: true,
    }),
    SystemModule,
    ShopsModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
