import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from 'src/track/entities/track.entity';
import { TrackService } from 'src/track/track.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Genre } from './entities/genre.entity';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Track, User])],
  controllers: [GenreController],
  providers: [GenreService, TrackService, UserService],
})
export class GenreModule {}
