import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TrackStatus {
  UNPUBLISHED = 'unpublished',
  ON_RECORDING = 'on_recording',
  RECORDED = 'recorded',
}

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  //TODO: crear la relación
  genre: string;

  @Column('varchar', { name: 'sub_genre' })
  subGenre: string;

  //TODO: por default url del logo de la app
  @Column({ type: 'varchar', nullable: true, default: 'urllogoapp.img' })
  cover: string;

  /*TODO: confirmar si viene del servicio de alojamiento
  @Column('int', { name: 'duration_ms' })
  durationMs: number;
  */

  @Column('varchar')
  url: string;

  @Column('int')
  year: number;

  @Column('varchar')
  language: string;

  @Column('varchar')
  lyric: string;

  @Column('simple-json', { name: 'externals_ids', nullable: true })
  externalsIds: Record<string, string>;

  @Column('varchar', { name: 'split_sheet', nullable: true })
  splitSheet: string;

  @Column({
    name: 'track_status',
    type: 'enum',
    enum: TrackStatus,
    default: TrackStatus.UNPUBLISHED,
  })
  trackStatus: TrackStatus;

  @Column('simple-json', { name: 'certificates_DNDA', nullable: true })
  certificatesDNDA: Record<string, string>;

  @Column('boolean', { default: true })
  available: boolean;

  @ManyToMany(() => User, (user) => user.tracks)
  @JoinTable()
  authors: User[];

  @Column('simple-json')
  awards: Record<string, string>;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date;
}
