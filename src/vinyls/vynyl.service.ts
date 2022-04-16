import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUpdateVinyl } from "src/payloads";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Vinyl } from "./vinyl.entity";
import { MailService } from "src/mail/mail.service";
import { ReviewService } from "src/reviews/review.service";
import { Review } from "src/reviews/review.entity";

@Injectable()
export class VinylService{
    constructor(@InjectRepository(Vinyl)
    private vinylRepository: Repository<Vinyl>,
    @Inject(forwardRef(() => UsersService))
     private readonly userservic:UsersService,
     private mailService: MailService,
     @Inject(forwardRef(() => ReviewService))
     private review:ReviewService
    ){}
    
    public async vinylCreate(createUpdateVinyl:CreateUpdateVinyl):Promise<Vinyl>{
        const newvinyl=  this.vinylRepository.create({...createUpdateVinyl})
        return  await this.vinylRepository.save(newvinyl)
    }

    public async sortByPriceDESC():Promise<Vinyl[]>{
        return await this.vinylRepository.find({order:{price:"DESC"}})
    }

    public async sortByPriceASC():Promise<Vinyl[]>{
        return await this.vinylRepository.find({order:{price:"ASC"}})
    }
    
    public async getAll(){
     const vinils= await this.vinylRepository.find()
        const review = await this.review.takeReviewByVinyl()
        return {vinils,review}
    }

    public async findByVinilNameOrAuthorName(vinilName?:string,author?:string):Promise<Vinyl[]>{
        if(vinilName!=undefined && author!=undefined){  
            return await this.vinylRepository.find({authorName:author,nameOfVinyl:vinilName})
        }
        else if(author){
            return await this.vinylRepository.find({authorName:author})
        }
        else{
            return await this.vinylRepository.find({nameOfVinyl:vinilName})
        }
    }

    public async findById(id:number):Promise<Vinyl>{
        return await this.vinylRepository.findOne(id)
    }

    public async  byuVinil(id:number,idUser:number){
       const vinyl = await this.findById(id)
       const curuser=await this.userservic.findById(idUser)
       console.log(vinyl)
       if(await this.vinylRepository.findOne({buyer:curuser,id:id})){
        throw new Error('уже куплена')
       }
       if(vinyl.price>curuser.money)
       throw new Error('мало денег')
       else{
          curuser.money-=vinyl.price
          vinyl.buyer=curuser
          await this.mailService.sendUserConfirmation()
          await this.userservic.saveUser(curuser)
          return await this.vinylRepository.save(vinyl)
       } 
    }
    public async findByUser(user:User):Promise<Vinyl[]>{
        const curuser = await this.userservic.findById(user.id)
        return await this.vinylRepository.find({buyer:curuser})
    }
    public async setAvatar(id: number, avatarUrl: string){
        const vinyl = await this.findById(id)
       vinyl.photo=avatarUrl;
       return await this.vinylRepository.save(vinyl)
    }
}