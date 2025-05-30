import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

import { Playlist } from './entities/playlist.entity';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, User, Track, Collaborator])],
  controllers: [PlaylistController],
  providers: [PlaylistService],
})
export class PlaylistModule {}
