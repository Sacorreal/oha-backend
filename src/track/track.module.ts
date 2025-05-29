import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { User } from 'src/user/entities/user.entity';
import { TrackAward } from './entities/track-award.entity';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track, User, Playlist, TrackAward])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
