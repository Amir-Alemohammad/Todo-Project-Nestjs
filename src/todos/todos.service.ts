import { Injectable , HttpException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import {Repository} from "typeorm"
import {InjectRepository} from "@nestjs/typeorm"
import { userGuard } from 'src/users/dto/userGuard.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>
    ){}
  async create(createTodoDto: CreateTodoDto) {
      const todo = await this.todoRepository.save(createTodoDto);
      return {
        statusCode:201,
        messge:"Todo Created!",
        todo,        
      }
  }

  async findAll() {
    const AllTodos = await this.todoRepository.find();
    if(!AllTodos){
      throw new HttpException("Todo Not Found",404);
    }
    return {
      Todos: AllTodos
    }
  }

  
  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({
      where:{
        id,
      }
    });
    if(!todo){
      throw new HttpException("Todo Not Found",404);
    }
    return {
      todo,
    }
  }
  

  async completedTodo(id:number){
    const checkComplet = await this.findOne(id);
    if(checkComplet.todo.completed === true){
      throw new HttpException("This Todo is Completed",400);
    }
    const todo = await this.todoRepository.update({id},{completed:true});
    if(todo.affected === 0){
      throw new HttpException("Todo Not Found",404);
    }
    return {
      statusCode: 200,
      message: "Todo Completed",
    }
  }


  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const completedTodo = await this.findOne(id);
    if(completedTodo.todo.completed === true){
      throw new HttpException("You Can't Update Completed Todo",400);
    }
    const check = await this.todoRepository.update({id , user : updateTodoDto.user },{ ...updateTodoDto });
    if(check.affected === 0){
      throw new HttpException("Todo Not Found",404);
    }
    return{
      statusCode:200,
      message: "Todo Updated",
    }
  }

  async remove(id: number,user : userGuard) {
    const check = await this.todoRepository.createQueryBuilder("Todo")
    .leftJoinAndSelect("Todo.user",'user')
    .where('Todo.id = :id',{id})
    .andWhere('Todo.user = :user',{user : user.id})
    .getOne();
    if(!check){
      throw new HttpException("Product Not Found",404);
    }    
    await this.todoRepository.remove(check)
    return {
      message: "Todo deleted!"
    }
  }
}
