import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Earning } from './entities/earning.entity';


@Injectable()
export class EarningsService {
  constructor(
    @InjectRepository(Earning)
    private readonly EarningsRepository: Repository<Earning>,
  ) {}
  getMonthlyEarnings(): any {
    // Mock data for different months
    return [
      { month: 'Jan', no: 1,  earnings: 627.15 },
      { month: 'Feb', no: 2, earnings: 458.95},
      { month: 'Mar', no: 3, earnings: 976.07 },
      { month: 'Apr', no: 4, earnings: 658.83},
      { month: 'May', no: 5, earnings: 89.98},
      { month: 'Jun', no: 6, earnings: 379.90 },
      { month: 'Jul', no: 7, earnings: 554.89 },
      { month: 'Aug', no: 8, earnings: 280.77 },
      { month: 'Sep', no: 9, earnings: 440.98},
      { month: 'Oct', no: 10, earnings: 176.43},
      { month: 'Nov', no: 11, earnings: 776.76},
      { month: 'Dec', no: 12, earnings: 456.90 },
    ];
  }
  

}
