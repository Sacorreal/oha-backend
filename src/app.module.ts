import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { PlaylistModule } from './playlist/playlist.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { AwardModule } from './award/award.module';
import { GenreModule } from './genre/genre.module';

@Module({
  imports: [UserModule, DatabaseModule, TrackModule, PlaylistModule, CollaboratorModule, AwardModule, GenreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
