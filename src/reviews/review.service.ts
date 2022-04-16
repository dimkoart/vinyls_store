import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUpdateReview } from "src/payloads";
import { UsersService } from "src/users/users.service";
import { VinylService } from "src/vinyls/vynyl.service";
import { Repository } from "typeorm";
import { Review } from "./review.entity";

@Injectable()
export class ReviewService{
    constructor(@InjectRepository(Review)
    private revviwRepository: Repository<Review>,
    @Inject(forwardRef(() => VinylService))
     private vinilservic:VinylService,
     ){}

     public async addRewie(createUpdateReview:CreateUpdateReview,email:string,vinylId:number):Promise<Review>{

      const curvinyl= await this.vinilservic.findById(vinylId)
      const newreviw= await this.revviwRepository.create({...createUpdateReview,author:email,vinilid:curvinyl})
      return await this.revviwRepository.save(newreviw)
     }

     public async takeReviewByVinyl():Promise<Review[]>{
        return await this.revviwRepository.find()
     }
     public async findByAuthor(email:string)
     {
         return await this.revviwRepository.find({author:email})
     }
}