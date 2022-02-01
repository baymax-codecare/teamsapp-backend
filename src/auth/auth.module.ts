import { Module, Global } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AzureADStrategy } from './azure-ad.strategy';
import { UserModule } from '../user/user.module';
import { ContactModule } from '../contact/contact.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthUser } from './interface/auth-user.interface';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends AuthUser {}
  }
}

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
