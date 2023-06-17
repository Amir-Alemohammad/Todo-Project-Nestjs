import {IsOptional,IsString , IsNotEmpty , IsBoolean} from "class-validator"
import { userGuard } from "src/users/dto/userGuard.dto";



export class CreateTodoDto {

    @IsString()
    @IsNotEmpty()
    text:string
    
    @IsBoolean()
    @IsOptional()
    completed:boolean
    
    @IsOptional()
    user: userGuard;

}
