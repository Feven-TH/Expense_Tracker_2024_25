import { Injectable } from '@nestjs/common';
import { user } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(user)
        private readonly userRepository: Repository<user>,
      ) {}
    // create users
    createUser(createUserDto: CreateUserDto): Promise<user> {
        return this.userRepository
          .findOne({
            where: [{ username: createUserDto.username }, { email: createUserDto.email }],
        })
          .then(existingUser => {
            if (existingUser) {
              return Promise.reject(new Error('Username or Email already taken'));
            }
    
            return bcrypt
              .hash(createUserDto.password, 10)
              .then(hashedPassword => {
                const user = this.userRepository.create({
                  username: createUserDto.username,
                  email: createUserDto.email,
                  password: hashedPassword,
                });
    
                return this.userRepository.save(user);
              });
          });
    }
    // userExists
    userExists(username: string): Promise<boolean> {
        return this.userRepository
          .findOne({ where: { username } })
          .then((user) => !!user);
    } 
    // Fetch User Profile (Get user details)
    fetchUserProfile(id: number) {
        return this.userRepository.findOneBy({ id });
      }
    // validate users
    validateUser(username: string, password: string): Promise<boolean> {
        return this.userRepository
          .findOne({ where: { username } })
          .then((user) => {
            if (!user) {
              return false; 
            }
            return bcrypt.compare(password, user.password).then((isMatch) => {
              return isMatch; 
            });
          })
          .catch(() => {
            return false; 
          });
      }
      

}