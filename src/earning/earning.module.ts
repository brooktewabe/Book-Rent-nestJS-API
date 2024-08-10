import { Module } from '@nestjs/common';
import { EarningsService } from './earning.service';
import { EarningsController } from './earning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Earning } from './entities/earning.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Earning]),
  ],
  controllers: [EarningsController],
  providers: [EarningsService],
})
export class EarningsModule {}
