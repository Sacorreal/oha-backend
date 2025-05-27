import { IsString, MinLength } from 'class-validator';

export class CreatePlaylistDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  userId: string;
}
