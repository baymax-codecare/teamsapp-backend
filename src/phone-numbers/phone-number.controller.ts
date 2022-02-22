import { PhoneNumber } from './phone-number.entity';
import { CreatePhoneNumberDTO } from './dto/create-phone-number.dto';
import { PhoneNumberService } from './phone-number.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
@Controller('numbers')
@UseGuards(JwtAuthGuard)
export class PhoneNumberController {
  constructor(private phoneNumberService: PhoneNumberService) {}

  @Post()
  public async create(
    @Body() createNumberDTO: CreatePhoneNumberDTO,
    @Req() req: Request,
  ): Promise<PhoneNumber> {
    return this.phoneNumberService.create(createNumberDTO, req.user.id);
  }
  @Get('available/:state/:area')
  public async availableNumbers(@Param('state') state, @Param('area') area) {
    return this.phoneNumberService.getAvailableNumbers(state, area);
  }
}
