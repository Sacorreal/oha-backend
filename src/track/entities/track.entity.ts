import { Genre } from 'src/genre/entities/genre.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
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

  @Column('varchar', { nullable: false })
  title: string;

  @ManyToOne(() => Genre, (genre) => genre.tracks, {
    onDelete: 'CASCADE',
    eager: false,
    nullable: false,
  })
  genre: Genre;

  @Column('varchar', { name: 'sub_genre', nullable: true })
  subGenre?: string;

  //TODO: por default url del logo de la app
  @Column({ type: 'varchar', default: 'urllogoapp.img' })
  cover: string;

  /*TODO: confirmar si viene del servicio de alojamiento
  @Column('int', { name: 'duration_ms' })
  durationMs: number;
  */

  @Column('varchar', { nullable: false })
  url: string;

  @Column('int', { nullable: false })
  year: number;

  @Column('varchar', { nullable: false })
  language: string;

  @Column('varchar', { nullable: true })
  lyric?: string;

  @Column('simple-json', { name: 'externals_ids', nullable: true })
  externalsIds?: Record<string, string>;

  @Column('varchar', { name: 'split_sheet', nullable: true })
  splitSheet?: string;

  @Column({
    name: 'track_status',
    type: 'enum',
    enum: TrackStatus,
    default: TrackStatus.UNPUBLISHED,
  })
  trackStatus: TrackStatus;

  @Column('simple-json', { name: 'certificates_DNDA', nullable: true })
  certificatesDNDA?: Record<string, string>;

  @Column('boolean', { default: true })
  available: boolean;

  @ManyToMany(() => User, (user) => user.tracks, { nullable: false })
  @JoinTable()
  authors: User[];

  @Column('simple-json', { nullable: true })
  awards?: Record<string, string>;

  @Column('boolean', { default: false })
  isGospel: boolean;

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
  deletedAt?: Date;
}
