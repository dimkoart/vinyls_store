import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt-strategy';
import { GoogleStrategy } from './strategies/google-strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({secret:'super-secret'})],
  controllers: [AuthController],
  providers: [AuthService,  JwtStrategy, GoogleStrategy]
})
export class AuthModule { }
