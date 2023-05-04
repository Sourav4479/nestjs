import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { CacheModule } from '@nestjs/cache-manager';
@Module({
  imports: [CacheModule.register()],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
