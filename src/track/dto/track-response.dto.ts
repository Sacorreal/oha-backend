import { Expose, Type } from 'class-transformer';
import { AuthorMinDto } from 'src/user/dto/author-min.dto';

export class TrackResponseDto {
  @Expose() id: string;
  @Expose() title: string;
  @Expose() year: number;
  @Expose() language: string;
  @Expose() url: string;
  @Expose() cover: string;
  @Expose() trackStatus: string;
  @Expose() available: boolean;
  @Expose() isGospel: boolean;

  @Expose()
  @Type(() => AuthorMinDto)
  authors: AuthorMinDto[];
}
