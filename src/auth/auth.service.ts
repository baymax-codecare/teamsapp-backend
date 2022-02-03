import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { AuthUser } from './interface/auth-user.interface';
import { ConfigService } from '@nestjs/config';
import { UserStatus } from 'src/user/type/user-status.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public async registerLocal(registerDto: RegisterDto): Promise<any> {
    const { preferred_username, name } = registerDto;
    const newUser = await this.userService.create({
      preferred_username,
      name,
      status: UserStatus.PROVIDE_OWN_NUMBER,
    });
    return newUser;
  }

  public async login(id: string) {
    // TODO: handle blocked user

    const user = await this.userService.userRepo.findOne(id);

    if (!user) {
      throw new HttpException('User not authorized', HttpStatus.UNAUTHORIZED);
    }

    const payload: AuthUser = {
      id: user.id,
      status: user.status,
    };

    return {
      user,
      jwt: this.jwtService.sign(payload, {
        expiresIn: this.configService.get('auth.expiresIn'),
      }),
    };
  }
}
