import { IsString, IsEmail, MinLength, Matches, IsOptional } from 'class-validator';
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message: 'Password must contain at least one uppercase letter, one number, and one special character',
    })
    password?: string;
  }
  