import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Invitation } from './entities/invitation.entity';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invitation, User])],
  controllers: [InvitationController],
  providers: [InvitationService, UserService],
})
export class InvitationModule {}
