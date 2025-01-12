import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { user } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([user])],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController]
  
})
export class UserModule {}

