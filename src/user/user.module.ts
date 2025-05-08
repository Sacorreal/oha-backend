import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/genre/entities/genre.entity';
import { GenreService } from 'src/genre/genre.service';
import { Invitation } from 'src/invitation/entities/invitation.entity';
import { InvitationService } from 'src/invitation/invitation.service';
import { Track } from 'src/track/entities/track.entity';
import { TrackService } from 'src/track/track.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Track, Invitation, Genre])],
  controllers: [UserController],
  providers: [UserService, TrackService, InvitationService, GenreService],
})
export class UserModule {}
