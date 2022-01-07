import { CreateContactDto } from '../contact/dto/create-contact.dto';
import { ContactService } from '../contact/contact.service';
import { UserService } from './../user/user.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly contactService: ContactService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  public async me(@Req() req) {
    return req.user;
  }

  @Get('azure')
  @UseGuards(AuthGuard('azure'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async azureAuth() {}

  @Get('azure/redirect')
  @UseGuards(AuthGuard('azure'))
  async azureAuthRedirect(@Req() req) {
    const user = req.user;
    // If user is new, register user & import contacts
    if (!!user.isNew) {
      const newUser = await this.userService.create({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      });

      // TODO: check if there's any update in user's contacts
      // Now only initiated for the first login (Test version)

      if (user.accessToken) {
        const { accessToken } = req.user;
        const contacts = await this.authService.getContacts(
          accessToken,
          newUser,
        );
        this.contactService.createMany(contacts as CreateContactDto[]);
      }
      return 'Successfully imported contacts';
    } else {
      return 'Already imported';
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const user = req.user;
    // If user is new, register user & import contacts
    if (!!user.isNew) {
      const newUser = await this.userService.create({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
      });

      // TODO: check if there's any update in user's contacts
      // Now only initiated for the first login (Test version)

      if (user.accessToken) {
        const { accessToken } = req.user;
        const contacts = await this.authService.getContacts(
          accessToken,
          newUser,
        );
        this.contactService.createMany(contacts as CreateContactDto[]);
      }
      return 'Successfully imported contacts';
    } else {
      return 'Already imported';
    }
  }
}
