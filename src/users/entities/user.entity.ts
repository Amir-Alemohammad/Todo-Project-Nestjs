import {Entity , Column , PrimaryGeneratedColumn} from "typeorm"
@Entity("User")
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({length:25,nullable:true})
    firstname: string
    
    @Column({length:25,nullable:true})
    lastname: string
    
    @Column({nullable:false})
    password: string;
    
    @Column({unique:true,nullable:false})
    email: string
    
}
