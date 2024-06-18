import { IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopPaymentDto {
  @ApiProperty({
    description: 'Payment amount',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  amount: number;
}
