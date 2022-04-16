import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "src/auth/strategies/jwt-strategy";
import { MailModule } from "src/mail/mail.module";
import { ReviewModule } from "src/reviews/review.module";
import { ReviewService } from "src/reviews/review.service";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
import { VinylController } from "./vinyl.controller";
import { Vinyl } from "./vinyl.entity";
import { VinylService } from "./vynyl.service";

@Module({
    imports: [TypeOrmModule.forFeature([Vinyl,User]),JwtModule.register({secret:'super-secret'}),MailModule,ReviewModule],
  exports: [VinylService],
  providers: [JwtStrategy,VinylService,UsersService],
  controllers: [VinylController]
})
export class VinylModule{}