import { Expose } from 'class-transformer';

export class AuthorMinDto {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() lastName: string;
  @Expose() imageUrl: string;
  @Expose() biography: string;
}
