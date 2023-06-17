import {IsEmail,IsString,IsNotEmpty,Length,IsOptional} from "class-validator"
export class registerDto{
    
    @IsString()
    @IsOptional()
    firstname:string;
    
    @IsString()
    @IsOptional()
    lastname:string;
    
    @Length(6,20)
    @IsNotEmpty()
    password:string;
    
    @IsEmail()
    @IsNotEmpty()
    email:string;
}