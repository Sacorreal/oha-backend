import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Track } from 'src/track/entities/track.entity';

import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Track, Playlist, Collaborator])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
