import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
import { Track } from 'src/track/entities/track.entity';
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
} from 'typeorm';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.playlists, { onDelete: 'CASCADE' })
  owner: User;

  @ManyToMany(() => Track, (track) => track.playlists)
  @JoinTable({
    name: 'playlist_tracks',
  })
  tracks: Track[];

  @ManyToMany(() => Collaborator)
  @JoinTable({
    name: 'playlist_collaborators',
  })
  collaborators: Collaborator[];

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
