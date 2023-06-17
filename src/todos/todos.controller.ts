import { Controller, Get, Post, Body, Put, Param, Delete,Request , UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { jwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('create')
  @UseGuards(jwtAuthGuard)
  create(@Body() createTodoDto: CreateTodoDto , @Request() request) {
    createTodoDto.user = request.user;
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() { 
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Get('/completed/:id')
  Completed(@Param('id') id:number){
    return this.todosService.completedTodo(id)
  }

  @Put(':id')
  @UseGuards(jwtAuthGuard)
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(jwtAuthGuard)
  remove(@Param('id') id: number) {
    return this.todosService.remove(id);
  }
}
