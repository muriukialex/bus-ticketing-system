import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './providers/user.service';

@Controller('user')
export class UserController {
  constructor(
    /**
     * Inject userService
     */
    private readonly userService: UserService,
  ) {}

  @Get(':id')
  public async getUserById(@Param('id') id: number) {
    return await this.userService.findUserById(id);
  }
}
