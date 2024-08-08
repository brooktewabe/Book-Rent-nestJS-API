import { 
  BadRequestException,
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  UploadedFiles, 
  UseGuards, 
  UseInterceptors 
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { createWriteStream } from 'fs';

@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('files')) 
  async create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFiles() files: multer.File[], // Capture multiple files
  ) {

    let bookData = { ...createBookDto };

    if (files && files.length === 2) {
      const [bookFile, coverFile] = files;
      // Save the book file to the desired directory
      const bookPath = './uploads/' + bookFile.originalname;
      createWriteStream(bookPath, { flags: 'w' }).write(bookFile.buffer);
      const coverPath = './uploads/' + coverFile.originalname;
      createWriteStream(coverPath, { flags: 'w' }).write(coverFile.buffer);
  
      // Update the book data with the file names
      bookData = { ...bookData, book: bookFile.originalname, cover: coverFile.originalname };
    } 
    else {
      throw new BadRequestException('Two files book and cover image are req.');
    }

    const bookInfo = await this.booksService.create(bookData);
    return bookInfo;
  }
  @Get('category/:category')
  findByCategory(@Param('category') category: string){
  return this.booksService.findByCategory(category);
  }
  
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
