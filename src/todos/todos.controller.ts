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

  @Get('completed/:id')
  @UseGuards(jwtAuthGuard)
  Completed(@Param('id') id:number){
    return this.todosService.completedTodo(id)
  }

  @Put('update/:id')
  @UseGuards(jwtAuthGuard)
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto , @Request() req) {
    updateTodoDto.user = req.user;
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete('delete/:id')
  @UseGuards(jwtAuthGuard)
  remove(@Param('id') id: number , @Request() request) {
    return this.todosService.remove(id,request.user);
  }
}
