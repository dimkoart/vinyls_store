import { Controller, UseGuards, Post, Req, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('google')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(AuthGuard('google'))
    @Get()
    async signInWithGoogle() { }

    @Get('/redirect')
    @UseGuards(AuthGuard('google'))
    async signInWithGoogleRedirect(@Req() req) {
        console.log(req.user)
  
        return await this.authService.signInWithGoogle(req.user)
    }

   

}
