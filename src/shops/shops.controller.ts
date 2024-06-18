import { Body, Controller, Post } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopsService } from './shops.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('shops')
@ApiTags('Shops')
export class ShopsController {
  constructor(private shopsService: ShopsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Returns shop id',
  })
  createShop(@Body() body: CreateShopDto) {
    return this.shopsService.createShop(body);
  }
}
