import { Controller, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from './notification.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @OnEvent('user.login')
  async handleUSerLogin(key: any) {
    console.log('User logged in', key);
    const userCache: string = await this.cacheManager.get(key);
    const user = JSON.parse(userCache);
    console.log('User', user);
    // this.notificationService.getUserById(data.user.id, (err, user) => {
    //   if (err) {
    //     console.log('User not found');
    //   }
    //   if (user) {
    //     console.log('User found');
    //   }
    // });
  }
}
