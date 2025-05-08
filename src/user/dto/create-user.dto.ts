import { IsArray, IsEmail, IsEnum, IsString } from 'class-validator';
import { RoleUser } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(RoleUser)
  role: RoleUser;

  @IsArray()
  @IsString({ each: true })
  genre: string[];
}
