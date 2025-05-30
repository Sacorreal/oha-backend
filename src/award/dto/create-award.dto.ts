import { IsEnum, IsString } from 'class-validator';
import { RegionAward } from '../entities/region-award.enum';

export class CreateAwardDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  city: string;

  @IsEnum(RegionAward)
  region: RegionAward;
}
