import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class Review {

  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  comment: string;
  @ApiProperty()
  @Column()
  score: string;

  @Column()
  author: string;

 
  @ManyToOne(type=>Vinyl,vinyl=>vinyl.reviews)
  vinilid:Vinyl

  
}