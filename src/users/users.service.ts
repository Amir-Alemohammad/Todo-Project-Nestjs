import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {InjectRepository} from "@nestjs/typeorm"
import { User } from './entities/user.entity';
import {Repository} from "typeorm"

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}
  
  async createUser(data: CreateUserDto) {
    const user = await this.userRepository.create(data)
    await this.userRepository.save(user);
    return{
      statusCode:201,
      message:"User Created!",
    }
  }
  
  async findUserByEmail(email:string){
      return await this.userRepository.findOne({
        where:{
          email
        }
      }); 
  }


  
}
