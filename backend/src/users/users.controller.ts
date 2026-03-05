import { Controller, Get, Put, Param,Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

 constructor(private usersService:UsersService){}

 @Get()
 getAllUsers(){
  return this.usersService.findAll()
 }

 @Put(':id/disable')
 disableUser(@Param('id') id:number){
  return this.usersService.disableUser(id)
 }

@Put(':id/disable')
disable(@Param('id') id:number){
 return this.usersService.disableUser(id)
}
@Delete(':id')
deleteUser(@Param('id') id:number){
 return this.usersService.delete(id)
}

}