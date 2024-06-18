import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { SetStatusesDto } from './dto/set-statuses.dto';

@Controller('payments')
@ApiTags('Payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Post('statuses')
  @ApiResponse({
    status: 200,
    description: 'Statuses changes successfully',
  })
  async setStatus(@Body() body: SetStatusesDto) {
    await this.paymentService.setStatus(body.ids, body.status);

    return { message: 'Payment status changes successfully' };
  }
}
