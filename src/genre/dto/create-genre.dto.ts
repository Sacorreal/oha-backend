import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  genre: string;

  @IsArray()
  @IsOptional()
  subGenre?: string[];
}
