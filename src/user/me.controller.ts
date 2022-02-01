import { PatchMeDto } from './dto/patch-me.dto';
import { UserService } from './user.service';
import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User } from './user.entity';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('me')
export class MeController {
  constructor(private userService: UserService) {}

  @Patch()
  public patchPersonalInfo(
    @Body() patchMeDto: PatchMeDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.userService.patchPersonalInfo(patchMeDto, req.user.id);
  }
}
