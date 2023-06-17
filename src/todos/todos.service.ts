import { Injectable , HttpException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import {Repository} from "typeorm"
import {InjectRepository} from "@nestjs/typeorm"

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


  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
