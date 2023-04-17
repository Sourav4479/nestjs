import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './components/auth/auth.module';
import { PrismaModule } from './components/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './components/user/user.controller';
import { UserModule } from './components/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
