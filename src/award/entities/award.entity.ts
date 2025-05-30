import { TrackAward } from 'src/track/entities/track-award.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegionAward } from './region-award.enum';

@Entity('awards')
export class Award {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  city: string;

  @Column({
    type: 'enum',
    enum: RegionAward,
  })
  region: RegionAward;

  @OneToMany(() => TrackAward, (trackAward) => trackAward.track)
  tracks?: TrackAward[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
