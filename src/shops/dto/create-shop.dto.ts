import { IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShopDto {
  @ApiProperty({
    description: 'Shop name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Shop commission',
    minimum: 0,
    maximum: 1,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  commission: number;
}
