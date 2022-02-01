import { ContactService } from '../contact/contact.service';
import { UserService } from './../user/user.service';
import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
    return this.authService.login(req.user.id);
  }

  /*
   * Create or Login user with Microsoft access token(bear token)
   */
  @Post('azure')
  @UseGuards(AuthGuard('azure'))
  async azureAuth(@Req() req) {
    if (!!req.user?.isNew) {
      const registeredUser = await this.authService.registerLocal(req.user);
      return this.authService.login(registeredUser.id);
    }
    return this.authService.login(req.user.id);
  }

  @Post('login')
  @HttpCode(401)
  async login() {
    return 'Unauthroized access';
  }
}
