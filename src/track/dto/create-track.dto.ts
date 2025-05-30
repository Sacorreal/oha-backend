import {
  ArrayNotEmpty,
  IsInt,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateTrackDto {
  @IsString()
  title: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @IsString()
  language: string;

  @ArrayNotEmpty()
  authors: User[];

  @IsString()
  url: string;

  @IsUUID()
  genre: string;

  @IsString()
  subGenre: string;
}
