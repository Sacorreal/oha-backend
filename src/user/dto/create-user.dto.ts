import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
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

  @IsOptional()
  @IsString()
  countryCode?: string;

  @IsOptional()
  @IsInt()
  phone?: number;

  @IsOptional()
  @IsString()
  typeCitizenID?: string;

  @IsOptional()
  @IsInt()
  citizenID?: number;

  @IsEnum(RoleUser)
  role: RoleUser;

  @IsArray()
  @IsString({ each: true })
  genre: string[];

  @IsOptional()
  @IsObject()
  socialNetworks?: Record<string, string>;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsBoolean()
  verified?: boolean;
}
