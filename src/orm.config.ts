import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  // password: 'postgres',
  password: '1234',
  port: 5432,
  database: 'bookdb',
  // host: 'db',
  host: '127.0.0.1',
  // database: 'bookdb',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
