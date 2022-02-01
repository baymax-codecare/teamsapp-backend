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
      identityMetadata: `https://login.microsoftonline.com/${configService.get(
        'auth.azure.tenantId',
      )}/v2.0/.well-known/openid-configuration`,
      clientID: configService.get('auth.azure.clientId'),
      clientSecret: configService.get('auth.azure.secret'),
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
