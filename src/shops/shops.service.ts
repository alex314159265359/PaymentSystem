import { Body, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ShopsModel } from './shops.model';

@Injectable()
export class ShopsService {
  constructor(@InjectModel(ShopsModel) private shopsModel: typeof ShopsModel) {}

  async createShop(@Body() body: CreateShopDto) {
    const shop = await this.shopsModel.create(body);
    return { id: shop.id };
  }
}
