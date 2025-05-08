import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from 'src/genre/genre.module';
import { GenreService } from 'src/genre/genre.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { Track } from './entities/track.entity';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [TypeOrmModule.forFeature([Track]), UserModule, GenreModule],
  controllers: [TrackController],
  providers: [TrackService, UserService, GenreService],
})
export class TrackModule {}
