import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { AppClusterService } from './app-cluster.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
// AppClusterService.register(4, bootstrap());
