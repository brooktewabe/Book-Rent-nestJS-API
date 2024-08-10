import { PartialType } from '@nestjs/mapped-types';
import { CreateEarningsDto } from './create-earning.dto';

export class UpdateEarningsDto extends PartialType(CreateEarningsDto) {}
