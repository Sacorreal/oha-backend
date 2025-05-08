import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackModule } from 'src/track/track.module';
import { TrackService } from 'src/track/track.service';
import { Genre } from './entities/genre.entity';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre]), TrackModule],
  controllers: [GenreController],
  providers: [GenreService, TrackService],
})
export class GenreModule {}
