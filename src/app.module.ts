import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, DatabaseModule, TrackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
