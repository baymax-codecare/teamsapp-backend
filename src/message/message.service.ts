import { FindMessageDto } from './dto/find-message.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
  ) {}

  /**
   * @function
   * @argument {FindMessageDto} findMessageDto
   * @returns {Message[]} returns an array of unread message
   */
  public getUnreadMessages(findMessageDto: FindMessageDto): Promise<Message[]> {
    return this.messageRepo.find({
      where: [
        {
          sender: {
            id: findMessageDto.senderId,
          },
          senderPhone: {
            id: findMessageDto.senderPhoneId,
          },
          receiver: {
            id: findMessageDto.receiverId,
          },
          receiverPhone: {
            id: findMessageDto.receiverPhoneId,
          },
          isRead: false,
        },
        {
          sender: {
            id: findMessageDto.senderId,
          },
          senderPhone: {
            id: findMessageDto.senderPhoneId,
          },
          receiver: {
            id: findMessageDto.receiverId,
          },
          receiverPhone: {
            id: findMessageDto.receiverPhoneId,
          },
          isRead: false,
          isSent: true,
        },
      ],
    });
  }

  /**
   * @function
   * @argument {uuid} receiveId
   * @returns {Message[]}
   */
  public getAllMessages(findMessageDto: FindMessageDto) {
    return this.messageRepo.find({
      where: [
        {
          sender: {
            id: findMessageDto.senderId,
          },
          senderPhone: {
            id: findMessageDto.senderPhoneId,
          },
          receiver: {
            id: findMessageDto.receiverId,
          },
          receiverPhone: {
            id: findMessageDto.receiverPhoneId,
          },
        },
        {
          sender: {
            id: findMessageDto.senderId,
          },
          senderPhone: {
            id: findMessageDto.senderPhoneId,
          },
          receiver: {
            id: findMessageDto.receiverId,
          },
          receiverPhone: {
            id: findMessageDto.receiverPhoneId,
          },
          isSent: true,
        },
      ],
    });
  }
}
