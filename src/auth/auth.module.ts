import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import {TypeOrmModule} from "@nestJs/typeorm"
import { JwtService } from '@nestjs/jwt/dist';


@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService , UsersService , JwtService]
})
export class AuthModule {}
