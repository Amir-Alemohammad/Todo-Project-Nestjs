import { Injectable , HttpException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { registerDto } from './dto/Register.dto';
import * as bcrypt from "bcryptjs"
import { LoginDto } from './dto/Login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        ){}
    
    async registerUser(registerDto:registerDto){
         const user = await this.userService.findUserByEmail(registerDto.email);
         if(user){
            throw new HttpException("User Already Exists!",401);
         }
         else{
            console.log(registerDto.password)
            registerDto.password = await bcrypt.hash(registerDto.password , 10);
            return await this.userService.createUser(registerDto);
         }   
    }

    async login(loginDto:LoginDto){
        const user = await this.userService.findUserByEmail(loginDto.email);
        if(!user){
            throw new HttpException("User Not Found",404);
        }
        else{
            const checkPass = await bcrypt.compare(loginDto.password , user.password);
            if(!checkPass){
                throw new HttpException("Email or Password invalid",401);
            }
            const accessToken = this.jwtService.sign({
                email : user.email,
                id : user.id
            },{
                expiresIn: "7d",
                secret: "secret"
            });
            return{
                statusCode:200,
                Token:accessToken,
            }
        }
    }


}
