import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Review } from './reviews/review.entity';
import { ReviewModule } from './reviews/review.module';
import { User } from './users/user.entity';
import { Vinyl } from './vinyls/vinyl.entity';
import { VinylModule } from './vinyls/vinyl.module';
import { StripeModule } from 'nestjs-stripe';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [AuthModule,VinylModule,ReviewModule,ConfigModule.forRoot(),TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'finnal',
    entities: [User,Vinyl,Review],
    synchronize: true,
  }),  
  StripeModule.forRoot({
    apiKey: 'my_secret_key',
    apiVersion: '2020-08-27',
  }),
MulterModule.register({
  dest:'./uploads'
})  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
