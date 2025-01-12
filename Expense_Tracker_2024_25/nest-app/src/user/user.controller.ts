import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { user } from 'src/entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

    @Post('register')
    createUser(@Body() createUserDto: CreateUserDto): Promise<user> {
        return this.userService.createUser(createUserDto);
    }

    @Get('exists/:username')
    userExists(@Param('username') username: string) {
        return this.userService.userExists(username).then((exists) => {
        return { username, exists };
        });
    }
    @Get(':id')
    fetchUserProfile(@Param('id') id: number) {
        return this.userService.fetchUserProfile(id);
    }
    @Post('validate')
    validateUser(@Body() body: { username: string; password: string }) {
        return this.userService
        .validateUser(body.username, body.password)
        .then((isValid) => {
            if (isValid) {
            return { message: 'User validated successfully' };
            } else {
            return { message: 'Invalid username or password' };
            }
        });
    }

}
