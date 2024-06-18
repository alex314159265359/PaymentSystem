import { IsArray, IsIn, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../payments.model';
import { StatusChangeEnum } from '../status-change.enum';

export class SetStatusesDto {
  @ApiProperty({
    description: 'Payment ids',
    isArray: true,
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];

  @ApiProperty({
    description: 'Payment status',
  })
  @IsIn([PaymentStatus.processed, PaymentStatus.completed])
  @IsString()
  status: StatusChangeEnum;
}
