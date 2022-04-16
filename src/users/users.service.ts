import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import { ReviewService } from 'src/reviews/review.service';
import { VinylService } from 'src/vinyls/vynyl.service';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @Inject(forwardRef(() => VinylService))
      private vinilservic:VinylService,
      @Inject(forwardRef(() => ReviewService))
        private reviewservice:ReviewService
    ) {}

    async pushToBase(user:User,role?:string):Promise<User>{
        if((await this.usersRepository.findAndCount({email: user.email}))[1] > 0)
        throw new BadRequestException("User already exists");

        const newuser=  this.usersRepository.create({...user,role:role})
        return  await this.usersRepository.save(newuser)
    }

    async saveUser(user:User):Promise<User>{
        return await this.usersRepository.save(user)
    }
    
   async showProfile(id:number){
        const curuser=await this.findById(id)
        const vinils = await this.vinilservic.findByUser(curuser)
        const review = await this.reviewservice.findByAuthor(curuser.email)
    return {curuser,vinils,review}
    }

   async updateProfile(id:number,firstName?:string,lastName?:string):Promise<User>{
    const curuser=await this.findById(id)
    console.log(curuser)
    if(firstName!=undefined && lastName!=undefined){
        curuser.firstName=firstName
        curuser.lastName=lastName
        return await this.usersRepository.save(curuser)
    }
    else if(lastName){
    curuser.lastName=lastName
    return await this.usersRepository.save(curuser)
    }
    else{
        curuser.firstName=firstName
        
        return await this.usersRepository.save(curuser)
    }

   }
    async findById(id: number): Promise<User | undefined> {
        return this.usersRepository.findOne(id);
    }

    async findBy(criteria: any): Promise<User[]> {
        return this.usersRepository.find(criteria);
    }
  
    async addVinyls(vinil:Vinyl,user:User){
        const curuser=await this.usersRepository.findOne(user.id)
        curuser.vinyls=[vinil]
        return await this.usersRepository.save(curuser)
    }

    public async setAvatar(id: number, avatarUrl: string){
        const user = await this.findById(id)
       user.photo=avatarUrl;
       return await this.usersRepository.save(user)
    }
    
}
