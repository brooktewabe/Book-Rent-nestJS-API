import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
  TypeOrmModule.forFeature([Book]), // Provide the Book repository
],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
