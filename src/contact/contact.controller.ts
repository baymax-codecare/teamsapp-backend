import { CreateContactDto } from './dto/create-contact.dto';
import { ContactService } from './contact.service';
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

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactController {
  constructor(private readonly contactService: ContactService) {}
  @Get(':id')
  public async list(@Param('id') id: string) {
    return await this.contactService.getContactsByUserId(id);
  }

  @Get()
  public async findAll() {
    return await this.contactService.getAll();
  }

  @Post()
  public async create(@Body() contact: CreateContactDto, @Req() req) {
    return this.contactService.create(contact, req.user.id);
  }
}
