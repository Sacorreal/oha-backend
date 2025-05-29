import { IsEmail, IsString, IsUUID } from 'class-validator';
export class CreateCollaboratorDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsUUID()
  invitedBy?: string;
}
