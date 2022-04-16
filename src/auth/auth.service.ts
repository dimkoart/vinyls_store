import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
const url="http://localhost:3000"

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }
    
    async login(user: User) {
      const token= this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role:user.role
        })
        return token
    }

    async signInWithGoogle(data) {
        if(!data) throw new BadRequestException();
        console.log(data)
        console.log(typeof(data.picture))
        let user = (await this.usersService.findBy({ where: [{ googleId: data.id }] }))[0];

        if(user) {
        console.log('пользователь существует в Бд')
        
        // user.photo=data.picture
        // await this.usersService.saveUser(user)
        return this.login(user);
        }

        user = (await this.usersService.findBy({ where: [{ email: data.email }] }))[0];
        if(user) throw new ForbiddenException('User already exists, but Google account was not connected to user\'s account')

        try {
            const newUser = new User();
            newUser.firstName = data.firstName;
            newUser.lastName = data.lastName;
            newUser.email = data.email;
            newUser.googleId = data.id;
            newUser.photo=data.picture;

            await this.usersService.pushToBase(newUser)
            return this.login(newUser);
        } catch(e) {
            throw new Error(e)
        }
    }

    
}