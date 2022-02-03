import { UserModule } from './../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneNumberService } from './phone-number.service';
import { Module } from '@nestjs/common';
import { PhoneNumberController } from './phone-number.controller';
import { PhoneNumber } from './phone-number.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneNumber]), UserModule],
  providers: [PhoneNumberService],
  controllers: [PhoneNumberController],
  exports: [PhoneNumberService],
})
export class PhoneNumberModule {}
