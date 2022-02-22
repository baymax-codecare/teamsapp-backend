import { ContactService } from './../contact/contact.service';
import { UserService } from './../user/user.service';
import { CreatePhoneNumberDTO } from './dto/create-phone-number.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { AvailableNumbers, Client } from '@bandwidth/numbers';
import Promise from 'bluebird';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneNumber } from './phone-number.entity';
import { Repository } from 'typeorm';
import { UserStatus } from 'src/user/type/user-status.enum';
@Injectable()
export class PhoneNumberService {
  constructor(
    @InjectRepository(PhoneNumber)
    public phoneNumberRepo: Repository<PhoneNumber>,
    private configService: ConfigService,
    private userService: UserService,
    private contactService: ContactService,
  ) {}

  public async getAvailableNumbers(state, area): Promise<string[]> {
    const accountId = this.configService.get('bandwidth.accountId');
    const userName = this.configService.get('bandwidth.userName');
    const password = this.configService.get('bandwidth.password');
    const client = new Client(accountId, userName, password);

    // TODO: make quantity dynamic
    const availableNumbers = await AvailableNumbers.listAsync(client, {
      state,
      quantity: 10,
    });

    //
    // filter numbers by area code
    //
    let filteredNumbers;
    if (availableNumbers.resultCount > 0) {
      filteredNumbers =
        availableNumbers.telephoneNumberList.telephoneNumber.filter(
          (number) => number.substr(0, 3) == area,
        );
    } else {
      filteredNumbers = [];
    }

    return filteredNumbers;
  }

  public async create(
    createNumberDTO: CreatePhoneNumberDTO,
    userId: string,
  ): Promise<number> {
    const user = await this.userService.userRepo.findOne(userId);
    const number = await this.phoneNumberRepo.create({
      phoneNumber: createNumberDTO.number,
      // user,
    });

    // Create a contact that is hidden
    const newContact = await this.contactService.create(
      {
        name: user.name,
        email: user.preferredUsername,
        phoneNumber: createNumberDTO.number,
        isHidden: true,
        isRoot: true,
      },
      userId,
    );

    const newNumber = await this.phoneNumberRepo.save(number);

    user.bandwidthNumber = newNumber;
    user.meContact = newContact;
    user.status = UserStatus.ACTIVE;
    this.userService.userRepo.save(user);
    return newNumber;
  }
}
