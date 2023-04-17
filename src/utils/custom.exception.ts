import { HttpException, HttpStatus } from '@nestjs/common';

export class SomethingWentWrongException extends HttpException {
  constructor() {
    super('Something went wrong.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
