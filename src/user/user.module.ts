import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationModule } from 'src/invitation/invitation.module';
import { InvitationService } from 'src/invitation/invitation.service';
import { TrackModule } from 'src/track/track.module';
import { TrackService } from 'src/track/track.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TrackModule, InvitationModule],
  controllers: [UserController],
  providers: [UserService, TrackService, InvitationService],
})
export class UserModule {}
