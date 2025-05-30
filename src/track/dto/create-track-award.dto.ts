import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Award } from 'src/award/entities/award.entity';
import { Track } from '../entities/track.entity';

export class CreateTrackAwardDto {
  @IsString()
  award: Award;

  @IsString()
  track: Track;

  @IsInt()
  @IsNotEmpty()
  yearAward: number;
}
