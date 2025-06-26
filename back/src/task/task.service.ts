import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateTaskDto) {
    return await this.prisma.task.create({
      data: {
        title: payload.title,
        description: payload.description,
      },
    });
  }

  async findAll() {
    return await this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async markCompleted(id: number) {
    const task = await this.findOne(id);

    return await this.prisma.task.update({
      where: { id },
      data: { completed: true },
    });
  }

  async delete(id: number) {
    const task = await this.findOne(id);
    return await this.prisma.task.delete({ where: { id } });
  }
}
