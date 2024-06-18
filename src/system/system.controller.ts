import { Body, Controller, Put } from '@nestjs/common';
import { SystemService } from './system.service';
import { SetCommissionDto } from './dto/set-commission.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('system')
@ApiTags('System')
export class SystemController {
  constructor(private systemService: SystemService) {}

  @Put('commission')
  @ApiResponse({
    status: 200,
    description: 'Successfully updated.',
  })
  setCommission(@Body() commissions: SetCommissionDto) {
    return this.systemService.setCommission(commissions);
  }
}
