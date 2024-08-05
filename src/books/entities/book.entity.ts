import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuidv4} from 'uuid';
@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: uuidv4;

  @Column({ type: 'text' })
  category: string;

  @Column({ type: 'text' })
  bookName: string;

  @Column({ type: 'text' })
  author: string;

  @Column({ type: 'text' })
  NoOfCopies: number;

  @Column({ type: 'text' })
  status: string;
  
  @Column({ type: 'text' })
  uploadedAt: Date;

  @Column({ type: 'text' })
  book: string;

  @Column({ type: 'text' })
  rentPrice: number;

  @Column({ type: 'text' })
  cover: string;

  // @Column({type: 'text'})
  // userId: string;
}
