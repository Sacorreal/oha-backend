import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Award } from 'src/award/entities/award.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { GenreService } from 'src/genre/genre.service';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { User } from 'src/user/entities/user.entity';
import { TrackAward } from './entities/track-award.entity';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, User, Playlist, TrackAward, Award, Genre]),
  ],
  controllers: [TrackController],
  providers: [TrackService, GenreService],
})
export class TrackModule {}
