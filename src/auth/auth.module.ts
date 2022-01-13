import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AzureADStrategy } from './azure-ad.strategy';
import { UserModule } from '../user/user.module';
import { ContactModule } from '../contact/contact.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    ContactModule,
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [AuthService, AzureADStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
