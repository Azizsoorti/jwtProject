import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
  providers: [UsersService, UserRepository], 
  exports: [UsersService, UserRepository]
})
export class UsersModule {}