import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { VinylService } from 'src/vinyls/vynyl.service';
import { Vinyl } from 'src/vinyls/vinyl.entity';
import { VinylModule } from 'src/vinyls/vinyl.module';
import { Review } from 'src/reviews/review.entity';
import { ReviewService } from 'src/reviews/review.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Vinyl,Review]),JwtModule.register({secret:'super-secret'}),VinylModule],
  exports: [UsersService],
  providers: [UsersService,JwtStrategy,VinylService,ReviewService],
  controllers: [UsersController]
})
export class UsersModule {}
