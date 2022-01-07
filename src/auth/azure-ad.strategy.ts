import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { BearerStrategy } from 'passport-azure-ad';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, 'azure') {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/999c9a43-ae68-4e6a-8f7e-3bf505f92204/v2.0/.well-known/openid-configuration`,
      clientID: '165f5133-3de9-44d4-9518-f0463ac9bcaf',
      clientSecret: '9JY7Q~OOv1iq7cImKT4v.at.1qRg180oM-Vo5',
    });
  }

  async validate(token, done): Promise<any> {
    console.log(token);
    done(token);
  }
}
