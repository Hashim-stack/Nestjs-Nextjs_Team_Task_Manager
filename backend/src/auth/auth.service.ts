import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

 constructor(
  private usersService: UsersService,
  private jwtService: JwtService
 ) {}

 async register(data: any) {

  const hash = await bcrypt.hash(data.password,10)

  const user = await this.usersService.create({
   ...data,
   password: hash
  })

  return user
 }

 async login(data:any){

  const user = await this.usersService.findByEmail(data.email)

  if(!user){
   throw new UnauthorizedException("User not found")
  }

  const valid = await bcrypt.compare(data.password,user.password)

  if(!valid){
   throw new UnauthorizedException("Invalid password")
  }

const payload = {
 sub: user.id,
 role: user.role
}

return {
 access_token:this.jwtService.sign(payload),
 role:user.role,
 id:user.id
}

 }

}