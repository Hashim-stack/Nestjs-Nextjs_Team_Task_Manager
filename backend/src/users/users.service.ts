import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

 constructor(
  @InjectRepository(User)
  private repo: Repository<User>,
 ) {}

 create(data:any){
  return this.repo.save(data)
 }

 findByEmail(email:string){
  return this.repo.findOne({
   where:{email}
  })
 }

findAll(){
 return this.repo.find()
}

disableUser(id:number){
 return this.repo.update(id,{isActive:false})
}
delete(id:number){
 return this.repo.delete(id)
}

}