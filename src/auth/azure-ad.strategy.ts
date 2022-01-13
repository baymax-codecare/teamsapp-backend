import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { BearerStrategy } from 'passport-azure-ad';
import { UserService } from './../user/user.service';
import { ConfigService } from '@nestjs/config';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, 'azure') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      identityMetadata: `https://login.microsoftonline.com/999c9a43-ae68-4e6a-8f7e-3bf505f92204/v2.0/.well-known/openid-configuration`,
      clientID: '165f5133-3de9-44d4-9518-f0463ac9bcaf',
      clientSecret: '9JY7Q~OOv1iq7cImKT4v.at.1qRg180oM-Vo5',
    });
  }

  async validate(token, done): Promise<any> {
    const { name, preferred_username } = token;
    try {
      const existedUser = await this.userService.userRepo.findOne({
        where: { preferred_username },
        select: ['id', 'preferred_username', 'name', 'status'],
      });

      if (existedUser) {
        return done(null, instanceToPlain(existedUser));
      }

      const user = {
        preferred_username,
        name,
        isNew: true,
      };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}
