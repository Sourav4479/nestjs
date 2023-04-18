import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodosController {
  constructor(
    private todoService: TodosService,
  ) {}

  @Post('create')
  createTodo(
    @Req() req: Request,
    @Body() body: CreateTodoDto,
  ) {
    const payload = {
      title: body.title,
      user: req.user,
    };
    return this.todoService.create(payload);
  }

  @Post('update')
  updateTodo(@Body() body: UpdateTodoDto) {
    const payload = {
      title: body.title,
      done: body.done,
      id: body.id,
    };
    return this.todoService.update(payload);
  }

  @Get('list')
  listTodos(@Req() req: Request) {
    return this.todoService.getAll(req.user);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodo(id);
  }

  @Get(':id')
  getTodo(@Param('id') id: number) {
    return this.todoService.getTodoById(id);
  }
}
