import { Controller, Get, Param, NotFoundException, Post, Body, Put, Delete, HttpCode, UseGuards, SetMetadata, applyDecorators, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUpdateUser} from '../payloads';
import { AuthGuard } from '@nestjs/passport';
// import { RoleGuard } from 'src/utils/get-role';
import { GetCurrUser, GetCurrUserById, GetRole } from 'src/utils';
import { AdminRoleGuard, UserRoleGuard } from 'src/utils/get-role';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from './user.entity';
import {ApiBody} from '@nestjs/swagger'
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('users')

export class UsersController {

    constructor(
        private usersService: UsersService,
    ) { }
    SERVER_URL:  string  =  "http://localhost:3000/";
    
    @Get('info')
    @UseGuards(AuthGuard('jwt'),UserRoleGuard)
    async showInfo(@GetCurrUserById() id) {
        return await this.usersService.showProfile(id)
    }

   
    @Put('updateInfo')
    @ApiBody({type:User})
    @UseGuards(AuthGuard('jwt'),UserRoleGuard)
    async updateinfo(@GetCurrUserById() id, @Body() payload:CreateUpdateUser){
    return await this.usersService.updateProfile(id,payload.firstName,payload.lastName)
    }


    @UseGuards(AuthGuard('jwt'),UserRoleGuard)
    @Post('setavatar')
    @UseInterceptors(FileInterceptor('file',
      {
        storage: diskStorage({
          destination: './avatars', 
          filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
        })
      }
    )
    )
    uploadAvatar(@GetCurrUserById() Id, @UploadedFile() file) {
      this.usersService.setAvatar(Id, `${this.SERVER_URL}${file.path}`);
    }

    @Get('avatars/:fileId')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: './avatars'});
  }

}


