import { Controller, Post , Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/Register.dto';
import { LoginDto } from './dto/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto:registerDto){
    return this.authService.registerUser(registerDto)
  }
  @Post('login')
  login(@Body() loginDto : LoginDto){
    return this.authService.login(loginDto);
  }
}
