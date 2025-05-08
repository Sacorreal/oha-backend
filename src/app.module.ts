import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

import { GenreModule } from './genre/genre.module';
import { InvitationModule } from './invitation/invitation.module';

@Module({
  imports: [TrackModule, DatabaseModule, UserModule, GenreModule, InvitationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
