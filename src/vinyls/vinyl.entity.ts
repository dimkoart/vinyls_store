import { Review } from 'src/reviews/review.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Vinyl {

  @PrimaryGeneratedColumn()
 
  id: number;
  @ApiProperty()
  @Column()
  authorName: string;
  @ApiProperty()
  @Column()
  price: number;
  @ApiProperty()
  @Column()
  nameOfVinyl: string;
  @ApiProperty()
  @Column()
  description: string;
  
  @Column({default: null})
  photo: string;
  @OneToMany(type => Review, review => review.id)
  reviews: Review[];

  @ManyToOne(type=>User,user=>user.vinyls)
  buyer:User
  
  
  
}