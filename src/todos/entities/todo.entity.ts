import { User } from "src/users/entities/user.entity"
import {JoinColumn,ManyToOne,Entity , Column , PrimaryGeneratedColumn} from "typeorm"

@Entity("Todo")
export class Todo {

    @PrimaryGeneratedColumn()
    id:number

    @Column({nullable:false})
    text:string

    @Column({nullable:true , default: false})
    completed:boolean

    @Column("int",{nullable:true})
    @ManyToOne(()=>User,(user)=>user.id)
    @JoinColumn({name:'user'})
    user: User

}
