import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { InvitedUserModule } from './invited-user/invited-user.module';

@Module({
  imports: [TrackModule, DatabaseModule, UserModule, InvitedUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
