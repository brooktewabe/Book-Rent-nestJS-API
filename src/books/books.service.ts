import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>){

  }
  async create(createBookDto: CreateBookDto) {
    const book = this.booksRepository.create(createBookDto)
    
    return await this.booksRepository.save(book);
  }

  async findAll() {
    return await this.booksRepository.find();
  }

  async findOne(id: string) {
    return await this.booksRepository.findOne({
      where: { id }
    });
  }
  async findByCategory(category: string){
    return await this.booksRepository.count({
      where: {category}
    });
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.findOne(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    
    // console.log('Original Book:', book);
    // console.log('Update Data:', updateBookDto);
  
    for (const key in updateBookDto) {
      if (updateBookDto.hasOwnProperty(key)) {
        book[key] = updateBookDto[key];
      }
    }
  
    // console.log('Updated Book:', book);
  
    return await this.booksRepository.save(book);
  }
  
  

  async remove(id: string) {
    const book = await this.findOne(id);
    if(!book){
      throw new NotFoundException()
    }
    return await this.booksRepository.remove(book)
  }
}
