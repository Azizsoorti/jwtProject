import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }

  async register(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> { 
    const { firstname, lastname, username, email, age, password } = createUserDto; 
  
    const existingUser = await this.usersService.findOne(username); 
    if (existingUser) { 
      throw new ConflictException('Username already exists'); 
    } 
  
    const newUser: UserEntity = {
      firstname: firstname,
      lastname: lastname,
      username,
      email,
      age,
      password
    };
  
    const newUserDto: CreateUserDto = {
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
      email: newUser.email,
      age: newUser.age,
      password: newUser.password
    };
    
    const savedUser = await this.usersService.createUser(newUserDto);
    
    const { password: _, ...result } = savedUser; 
    return result; 
  }
  
}
