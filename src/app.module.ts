import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './components/auth/auth.module';
import { PrismaModule } from './components/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './components/user/user.controller';
import { UserModule } from './components/user/user.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from './components/notification/notification.module';
import { TodosModule } from './components/todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    EventEmitterModule.forRoot(),
    NotificationModule,
    TodosModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
