import { Controller } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}
  @OnEvent('user.login')
  handleUSerLogin(data: any) {
    console.log('User logged in', data);
    this.notificationService.getUserById(
      data.user.id,
      (err, user) => {
        if (err) {
          console.log('User not found');
        }
        if (user) {
          console.log('User found');
        }
      },
    );
  }
}
