import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/components/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  useJwtStrategy: any;
  constructor(private config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
    this.useJwtStrategy = ExtractJwt.fromAuthHeaderAsBearerToken();
  }

  async validate(payload: any) {
    // const value = ExtractJwt.fromAuthHeaderAsBearerToken();
    console.log(this.useJwtStrategy);
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    if (!user) {
      return null;
    }
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.roles,
    };
  }
}
