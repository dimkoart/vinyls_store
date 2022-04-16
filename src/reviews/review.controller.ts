import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUpdateReview } from "src/payloads";
import { GetCurrUserByEmail, UserRoleGuard } from "src/utils";
import { ReviewService } from "./review.service";
import {ApiBody} from '@nestjs/swagger'
import { Review } from "./review.entity";
@Controller('review')
export class ReviewController{
constructor(private review:ReviewService){}

@UseGuards(AuthGuard('jwt'),UserRoleGuard)
@ApiBody({type:Review})
@Post('create/:id')
public async addreview(@Body() payload:CreateUpdateReview,@GetCurrUserByEmail() isEmail,@Param('id', ParseIntPipe) id: number,){
//    return  console.log(payload,isEmail,id)
 return await this.review.addRewie(payload,isEmail,id)
}

}