import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;
  @ApiProperty()
  @Column()
  firstName: string;
  @ApiProperty()
  @Column()
  lastName: string;

  @Column({default: null})
  @Exclude()
  googleId: string;

  @Column({default: null})
  photo:string
  
  @Column({default: 'USER'})
  @Exclude()
  role: string;

  @Column({default: 10000000})
  money:number
  
  @OneToMany(type => Vinyl, vinyl=> vinyl.buyer)
  vinyls:Vinyl[]
}