import { IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetCommissionDto {
  @ApiProperty({
    description: 'Fixed commission',
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  a: number;

  @ApiProperty({
    description: 'Float commission',
    minimum: 0,
    maximum: 1,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  b: number;

  @ApiProperty({
    description: 'Float commission',
    minimum: 0,
    maximum: 1,
    default: 0,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  d: number;
}
