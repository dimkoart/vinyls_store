import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateUpdateVinyl } from "src/payloads";
import { AdminRoleGuard, GetCurrUserById, UserRoleGuard } from "src/utils";
import { VinylService } from "./vynyl.service";
import { diskStorage } from  'multer';
import { extname } from "path";
import { Vinyl } from "./vinyl.entity";
import {ApiBody} from '@nestjs/swagger'
@Controller('/vinyl')
export class VinylController{
    SERVER_URL:  string  =  "http://localhost:3000/";
    constructor(private vinylRepository:VinylService,
        ){   
    }


    @UseGuards(AuthGuard('jwt'),AdminRoleGuard)
    @Post('create')
    @ApiBody({type:Vinyl})
    async createVinyyl(@Body() payload:CreateUpdateVinyl){
        return await this.vinylRepository.vinylCreate(payload)
    }
    @Get('getAll')
    async getall(){
      return await this.vinylRepository.getAll()
    }
    @Get('sortDesc')
    async sortByPriceDESC():Promise<Vinyl[]>{
        return  await this.vinylRepository.sortByPriceDESC()
    }

    @Get('sortAsc')
    async sortByPriceASC():Promise<Vinyl[]>{
        return await this.vinylRepository.sortByPriceASC()
    }

    @Get('findVinyls')
    @ApiBody({type:Vinyl})
    async findVinyls(
        @Body() payload:CreateUpdateVinyl
    ){
        return await this.vinylRepository.findByVinilNameOrAuthorName(payload.nameOfVinyl,payload.authorName)
    }

    @UseGuards(AuthGuard('jwt'),UserRoleGuard)
    @Put('addVinil/:id')
    async addVinil(@GetCurrUserById() idUser, @Param('id', ParseIntPipe) id: number,){
        console.log(idUser)
    return await this.vinylRepository.byuVinil(id,idUser)
    }

    @UseGuards(AuthGuard('jwt'),UserRoleGuard)
    @Get(':id')
    async takevinyl(@Param('id', ParseIntPipe) id:number)
    {
        return this.vinylRepository.findById(id)
    }

    @UseGuards(AuthGuard('jwt'),AdminRoleGuard)
    @Post(':id/avatar')
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
    uploadAvatar(@Param('id') Id, @UploadedFile() file) {
      this.vinylRepository.setAvatar(Number(Id), `${this.SERVER_URL}${file.path}`);
    }

    @Get('avatars/:fileId')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: './avatars'});
  }
}