import { Injectable } from '@nestjs/common';
import { SomethingWentWrongException } from 'src/utils/custom.exception';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(payload: any) {
    try {
      // create todo

      const todo = this.prisma.todos.create({
        data: {
          title: payload.title,
          done: false,
          userId: payload.user.id,
        },
      });
      const updateTodosCount =
        this.prisma.user.update({
          where: {
            id: payload.user.id,
          },
          data: {
            todosCount: {
              increment: 1,
            },
          },
        });
      const transaction =
        await this.prisma.$transaction([
          todo,
          updateTodosCount,
        ]);
      if (transaction) {
        return 'Todo created successfully';
      }
      if (!transaction) {
        throw new SomethingWentWrongException();
      }
    } catch (error) {
      throw new SomethingWentWrongException();
    }
  }

  async getAll(payload: any) {
    try {
      const todos =
        await this.prisma.todos.findMany({
          where: {
            userId: payload.id,
          },
        });
      if (todos) {
        return todos;
      }
      if (!todos) {
        return 'No todos found';
      }
    } catch (error) {
      throw new SomethingWentWrongException();
    }
  }

  async update(payload: any) {
    try {
      const todo =
        await this.prisma.todos.findUnique({
          where: {
            id: payload.id,
          },
        });
      if (!todo) {
        return 'Todo not found';
      }
      if (todo) {
        const updatedTodo =
          await this.prisma.todos.update({
            where: {
              id: payload.id,
            },
            data: {
              title: payload.title,
              done: payload.done,
            },
          });
        if (updatedTodo) {
          return 'Todo updated successfully';
        }
      }
    } catch (error) {
      throw new SomethingWentWrongException();
    }
  }

  async deleteTodo(id: number) {
    try {
      const todo =
        await this.prisma.todos.findUnique({
          where: {
            id,
          },
        });
      if (!todo) {
        return 'Todo not found';
      }
      if (todo) {
        const deletedTodo =
          await this.prisma.todos.delete({
            where: {
              id,
            },
          });
        if (deletedTodo) {
          return 'Todo deleted successfully';
        }
      }
    } catch (error) {
      throw new SomethingWentWrongException();
    }
  }

  async getTodoById(id: number) {
    try {
      const todo =
        await this.prisma.todos.findUnique({
          where: {
            id,
          },
        });
      if (!todo) {
        return 'Todo not found';
      }
      if (todo) {
        return todo;
      }
    } catch (error) {
      throw new SomethingWentWrongException();
    }
  }
}
