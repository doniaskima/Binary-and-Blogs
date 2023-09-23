import { Body, Controller, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/register.user.dto';
import { UserService } from './user.service';


@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() params: UserRegisterDto) {
    return this.userService.register(params);
  }
}
