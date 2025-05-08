import { IsArray, IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  genreId: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsInt()
  year: number;

  @IsString()
  @IsNotEmpty()
  language: string;

  @IsArray()
  @IsString({ each: true })
  authorIds: string[];
}
