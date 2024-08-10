import { Controller, Get, UseGuards } from '@nestjs/common';
import { EarningsService } from './earning.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('earning')
@UseGuards(AuthGuard)
export class EarningsController {
  constructor(private readonly earningsService: EarningsService) {}

  @Get('monthly')
  getMonthlyEarnings() {
    return this.earningsService.getMonthlyEarnings();
  }

}
