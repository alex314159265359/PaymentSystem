import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopsService } from './shops.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateShopPaymentDto } from './dto/create-shop-payment.dto';

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

  @Post(':id/payment')
  @ApiResponse({
    status: 200,
    description: 'Returns payment id',
  })
  createPayments(@Param('id') id: number, @Body() body: CreateShopPaymentDto) {
    return this.shopsService.createPayment(id, body.amount);
  }

  @Post(':id/payout')
  @ApiResponse({
    status: 200,
    description: 'Returns payout info',
  })
  payout(@Param('id') id: number) {
    return this.shopsService.payout(id);
  }
}
