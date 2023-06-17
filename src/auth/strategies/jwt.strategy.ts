import {Injectable} from "@nestjs/common"
import {PassportStrategy} from "@nestjs/passport";
import {Strategy , ExtractJwt} from "passport-jwt"
import { Payload } from "src/interface/payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "secret"
        })
    }
    async validate(payload : Payload){
        return {
        id: payload.id,
        email: payload.email,
        }
    }
}