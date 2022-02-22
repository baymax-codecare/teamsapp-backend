import { UserService } from './../user/user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
    private userService: UserService,
  ) {}
  public async createMany(manyContactsDto: CreateContactDto[]): Promise<void> {
    this.contactRepo
      .createQueryBuilder()
      .insert()
      .into(Contact)
      .values(manyContactsDto)
      .execute();
  }

  public async create(
    createContactDto: CreateContactDto,
    userId: string,
  ): Promise<Contact> {
    // TODO: check userId as well
    const existContact = await this.contactRepo.findOne({
      where: {
        phoneNumber: createContactDto.phoneNumber,
        user: {
          id: userId,
        },
      },
    });
    if (existContact) {
      throw new HttpException(
        'Contact with the same phone number exists',
        HttpStatus.CONFLICT,
      );
    }
    const newContact = this.contactRepo.create(createContactDto);

    // If name is '' then use phoneNumber as name
    if (newContact.name === '' || newContact.name === undefined) {
      newContact.name = newContact.phoneNumber;
    }

    const user = await this.userService.userRepo.findOneOrFail(userId);
    newContact.user = user;
    return this.contactRepo.save(newContact);
  }

  public async getContactById(id: string): Promise<Contact> {
    return this.contactRepo.findOne(id);
  }

  public async getContactByPhoneAndUserId(
    phoneNumber: string,
    userId: string,
  ): Promise<Contact> {
    return this.contactRepo.findOne({
      where: {
        phoneNumber,
        user: {
          id: userId,
        },
      },
    });
  }

  public async getRootContactByPhone(phone: string): Promise<Contact> {
    return this.contactRepo.findOne({
      where: {
        isRoot: true,
        phoneNumber: phone,
      },
      relations: ['user'],
    });
  }

  public async getContactsByUserId(userId: string): Promise<Contact[]> {
    return this.contactRepo.find({
      where: {
        user: {
          id: userId,
        },
        isHidden: false,
      },
    });
  }
  public async getAll(): Promise<Contact[]> {
    return this.contactRepo.find({
      where: {
        isHidden: false,
      },
    });
  }
}
