import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async getUserById(id, callback) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    if (!user) {
      callback(true, false);
    }
    if (user) {
      callback(false, true);
    }
  }
}
