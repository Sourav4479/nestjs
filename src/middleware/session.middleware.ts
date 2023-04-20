import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class SessionMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    const secret = process.env.SESSION_SECRET || 'secret'; // or use a config file for better security
    const sessionOptions: session.SessionOptions = {
      secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false, // change to true for HTTPS
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      },
    };
    session(sessionOptions)(req, res, next);
    cookieParser()(req, res, next);
  }
}
