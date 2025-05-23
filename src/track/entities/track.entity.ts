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
import { TrackStatus } from './track-status.enum';

@Entity('tracks')
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false })
  title: string;

  /* @ManyToOne(() => Genre, (genre) => genre.tracks, {
    onDelete: 'CASCADE',
    eager: false,
    nullable: false,
  })
  genre: Genre;
*/

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
    default: TrackStatus.INEDITA,
  })
  trackStatus: TrackStatus;

  @Column('jsonb', { name: 'certificates_DNDA', nullable: true })
  certificatesDNDA?: Record<string, string>;

  @Column('boolean', { default: true })
  available: boolean;

  @ManyToMany(() => User, (user) => user.tracks)
  @JoinTable()
  authors: User[];

  /*@ManyToMany(() => Playlist, (playlist) => playlist.tracks, {
    nullable: false,
  })
  playList: Playlist[];
  */

  //TODO: crear entidad award, tipo de dato <Award,year>
  @Column('jsonb', { nullable: true })
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
