import { FindMessageDto } from './dto/find-message.dto';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Controller, Query, UseGuards, Get } from '@nestjs/common';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get('/unread')
  public findUnreadMessages(@Query() findMessageDto: FindMessageDto) {
    return this.messageService.getUnreadMessages(findMessageDto);
  }

  @Get()
  public findMessages(@Query() findMesageDto: FindMessageDto) {
    return this.messageService.getAllMessages(findMesageDto);
  }
}
