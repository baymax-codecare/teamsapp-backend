import { MessageModule } from './message/message.module';
import { PhoneNumberModule } from './phone-numbers/phone-number.module';
import { GlobalJwtModule } from './shared/jwt.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactModule } from './contact/contact.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // return configService.get('isProd') ? [] : [
        return [
          {
            rootPath: configService.get('uploadDir'),
            serveRoot: '/public',
          },
        ];
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),

    GlobalJwtModule,

    ContactModule,

    AuthModule,

    UserModule,

    PhoneNumberModule,

    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
