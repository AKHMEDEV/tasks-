import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('task')
  create(@Body() payload: CreateTaskDto) {
    return this.taskService.create(payload);
  }

  @Get('tasks')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('task/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Patch('task/:id')
  complete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.markCompleted(id);
  }

  @Delete('task/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.delete(id);
  }
}
