import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "src/auth/strategies/jwt-strategy";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { Vinyl } from "src/vinyls/vinyl.entity";
import { VinylService } from "src/vinyls/vynyl.service";
import { ReviewController } from "./review.controller";
import { Review } from "./review.entity";
import { ReviewService } from "./review.service";


@Module({
    imports: [TypeOrmModule.forFeature([Review,Vinyl,User]),JwtModule.register({secret:'super-secret'}),],
  exports: [ReviewService],
  providers: [JwtStrategy,ReviewService,VinylService,UsersService],
  controllers: [ReviewController]
})
export class ReviewModule{}