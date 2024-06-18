import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SystemSettings } from './system/system-settings.model';
import { ConfigModule } from '@nestjs/config';
import { ShopsModule } from './shops/shops.module';

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
      models: [SystemSettings],
      logging: console.log,
      synchronize: true,
      autoLoadModels: true,
    }),
    SystemModule,
    ShopsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
