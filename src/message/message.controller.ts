import { PatchMessageDto } from './dto/patch-message.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { FindMessageDto } from './dto/find-message.dto';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import {
  Controller,
  Query,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { InboundMessageDto } from './dto/inbound-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/unread')
  public findUnreadMessages(@Query() findMessageDto: FindMessageDto) {
    return this.messageService.getUnreadMessages(findMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  public findMessages(@Query() findMessageDto: FindMessageDto) {
    return this.messageService.getAllMessages(findMessageDto);
  }

  @Post('/inbound')
  public inboundMessage(@Body() inboundMessageDto: InboundMessageDto) {
    return this.messageService.getInboundMessage(inboundMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  public patchMessage(@Body() patchMessageDto: PatchMessageDto) {
    return this.messageService.patchMessageStatus(patchMessageDto);
  }
}
