import { Playlist } from 'src/playlist/entities/playlist.entity';
import { Track } from 'src/track/entities/track.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column('varchar', { nullable: false, select: false })
  password: string;

  @Column('varchar', { name: 'country_code', nullable: true })
  countryCode?: string;

  @Column('int', { nullable: true })
  phone?: number;

  @Column('varchar', { name: 'type_citizen_id', nullable: true })
  typeCitizenID?: string;

  @Column('int', { name: 'citizen_id', nullable: true })
  citizenID?: number;

  @Column({
    name: 'role_user',
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column('varchar', { name: 'image_url', nullable: true })
  imageUrl: string;

  @Column('boolean', { default: false })
  verified: boolean;

  @Column('text', { nullable: true })
  biography?: string;

  @Column('jsonb', { name: 'social_networks', nullable: true })
  socialNetworks?: Record<string, string>;

  @ManyToMany(() => Track, (track) => track.authors)
  tracks: Track[];

  @ManyToMany(() => Track, (track) => track.favoritedBy)
  favoriteTracks?: Track[];

  //invitaciones enviadas

  //colaboradores asociados

  @OneToMany(() => Playlist, (playlist) => playlist.owner)
  playlists: Playlist[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
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
