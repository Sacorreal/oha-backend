import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackAward } from 'src/track/entities/track-award.entity';
import { AwardController } from './award.controller';
import { AwardService } from './award.service';
import { Award } from './entities/award.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Award, TrackAward])],
  controllers: [AwardController],
  providers: [AwardService],
})
export class AwardModule {}
