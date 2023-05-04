import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/components/prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as argon from 'argon2';
import { SomethingWentWrongException } from 'src/utils/custom.exception';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cache } from 'cache-manager';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async signup(data: SignUpDto) {
    const hash = await argon.hash(data.password);
    try {
      //save user
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          hash,
        },
      });
      return this.generateResponse(user);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already in use');
      } else {
        throw new SomethingWentWrongException();
      }
    }
  }
  async signin(data: SignInDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }
      const valid = await argon.verify(user.hash, data.password);
      if (!valid) {
        throw new ForbiddenException('Invalid credentials');
      }

      // await this.cacheManager.set('current_user', JSON.stringify(user), 43200000); // ttl 12 hr
      // // Emit user.login event
      // this.eventEmitter.emit('user.login', 'current_user');
      const response = await this.generateResponse(user);
      return response;
    } catch (error) {
      throw new SomethingWentWrongException();
    }
  }
  async generateResponse(user: any): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      roles: ['admin'],
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60m',
      secret,
    });
    return {
      access_token: token,
      ...payload,
    };
  }
}
