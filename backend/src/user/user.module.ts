import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindUserByEmailProvider } from './providers/find-user-by-email.provider';
import { UserService } from './providers/user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, FindUserByEmailProvider],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
