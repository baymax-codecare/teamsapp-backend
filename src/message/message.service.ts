import { MessageGateway } from './message.gateway';
import { InboundMessageDto } from './dto/inbound-message.dto';
import { ConfigService } from '@nestjs/config';
import { ContactService } from './../contact/contact.service';
import { FindMessageDto } from './dto/find-message.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { PatchMessageDto } from './dto/patch-message.dto';
import { Client, ApiController, MessageRequest } from '@bandwidth/messaging';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
    private contactService: ContactService,
    private configService: ConfigService,
    private messageGateway: MessageGateway,
  ) {}

  /**
   * Create Message entity
   * @param createMessageDto
   * @returns created message
   */
  public async createMessage(
    createMessageDto: CreateMessageDto,
  ): Promise<Message> {
    // TODO: integrate bandwidth api & socket

    const sender = await this.contactService.getContactById(
      createMessageDto.sender_id,
    );

    if (!sender) {
      throw new HttpException('Sender not found', HttpStatus.NOT_FOUND);
    }

    const receiver = await this.contactService.getContactById(
      createMessageDto.receiver_id,
    );

    if (!receiver) {
      throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
    }

    const message = this.messageRepo.create({
      ...createMessageDto,
      isRead: false,
      isSent: false,
      isSenderDeleted: false,
      isReceiverDeleted: false,
    });
    message.sender = sender;
    message.receiver = receiver;
    const newMessage = this.messageRepo.save(message);

    //
    // Bandwidth API
    //
    const client = new Client({
      basicAuthUserName: this.configService.get('bandwidth.userName'),
      basicAuthPassword: this.configService.get('bandwidth.password'),
    });

    const controller = new ApiController(client);
    const accountId = this.configService.get('bandwidth.accountId');

    const applicationId = this.configService.get('bandwidth.applicationId');
    const toPhoneNumber = '+1' + message.receiver.phoneNumber;
    const fromPhoneNumber = '+14242545024';
    const text = message.sms;
    const body = {
      applicationId,
      to: [toPhoneNumber],
      from: fromPhoneNumber,
      text,
    };

    await controller.createMessage(accountId, body);
    return newMessage;
  }

  /**
   * Update message status (ex: is_sent, is_read ...)
   * @param patchMessageDto
   * @returns updated message entity
   */
  public async patchMessageStatus(
    patchMessageDto: PatchMessageDto,
  ): Promise<Message> {
    const message = await this.messageRepo.findOne(patchMessageDto.id);
    const updatedMessage = {
      ...message,
      ...patchMessageDto,
    };
    return this.messageRepo.save(updatedMessage);
  }

  public async getInboundMessage(
    inboundMessageDto: InboundMessageDto,
  ): Promise<void> {
    console.log('INBOUND MESSAGE');
    console.log(inboundMessageDto);

    //
    // Demo & Sender is fixed for demo purpose
    //
    const sender = await this.contactService.getContactById(
      '10a6cb1b-2547-4f84-a248-3ae894293188',
    );

    if (!sender) {
      throw new HttpException('Sender not found', HttpStatus.NOT_FOUND);
    }

    const receiver = await this.contactService.getContactById(
      '19111290-8cf4-478f-97c6-a46b0fa0d178',
    );

    if (!receiver) {
      throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
    }
    console.log('Inbound Message');
    console.log(inboundMessageDto);

    const message = this.messageRepo.create({
      sms: inboundMessageDto[0].message.text,
      isRead: false,
      isSent: false,
      isSenderDeleted: false,
      isReceiverDeleted: false,
    });
    message.sender = sender;
    message.receiver = receiver;
    this.messageRepo.save(message);
    this.messageGateway.server.to('DemoRoomID').emit('msgToClient', {});
  }

  /**
   * @function
   * @argument findMessageDto
   * @returns {Message[]} returns an array of unread message
   */
  public getUnreadMessages(findMessageDto: FindMessageDto): Promise<Message[]> {
    return this.messageRepo.find({
      where: [
        {
          sender: {
            id: findMessageDto.sender_id,
          },
          receiver: {
            id: findMessageDto.receiver_id,
          },
          isRead: false,
        },
        {
          sender: {
            id: findMessageDto.sender_id,
          },
          receiver: {
            id: findMessageDto.receiver_id,
          },
          isRead: false,
          isSent: true,
        },
      ],
    });
  }

  /**
   * @function
   * @argument findMessageDto FindMessageDto
   * @returns {Message[]}
   */
  public getAllMessages(findMessageDto: FindMessageDto) {
    return this.messageRepo.find({
      where: [
        {
          sender: findMessageDto.sender_id,
          receiver: findMessageDto.receiver_id,
        },
        {
          sender: findMessageDto.receiver_id,
          receiver: findMessageDto.sender_id,
          // isSent: true, //TODO: only show sent message, for demo purpose now
        },
      ],
      relations: ['sender', 'receiver'],
    });
  }
}
