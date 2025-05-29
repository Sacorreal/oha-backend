import { Track } from 'src/track/entities/track.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Award } from '../../award/entities/award.entity';

@Entity('tracks_awards')
export class TrackAward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', name: 'year_award' })
  yearAward: number;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @ManyToOne(() => Award, (award) => award.tracks, {
    onDelete: 'CASCADE',
  })
  award: Award;

  @ManyToOne(() => Track, (track) => track.awards, {
    onDelete: 'CASCADE',
  })
  track: Track;
}
