import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(username: string): Promise<UserEntity> {
    return this.userRepository.findUserDetailsByUsername(username);
  }

 async createUser(userEntity: UserEntity): Promise<UserEntity> { 
  const user = this.userRepository.create(userEntity); 
  return await this.userRepository.save(user); 
}
}