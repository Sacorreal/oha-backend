import { Playlist } from 'src/playlist/entities/playlist.entity';
import { UserRole } from 'src/user/entities/user-role.enum';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('collaborators')
export class Collaborator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { nullable: false, unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.COLABORADOR,
  })
  role: UserRole;

  @ManyToMany(() => Playlist, (playlist) => playlist.collaborators)
  playlists?: Playlist[];

  @ManyToOne(() => User, (user) => user.Collaborators, {
    onDelete: 'SET NULL',
  })
  invitedBy: User;

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
