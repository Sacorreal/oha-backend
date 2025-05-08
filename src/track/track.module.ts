import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/genre/entities/genre.entity';
import { GenreService } from 'src/genre/genre.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track, User, Genre])],
  controllers: [TrackController],
  providers: [TrackService, UserService, GenreService],
})
export class TrackModule {}
