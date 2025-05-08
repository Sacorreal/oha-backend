import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('simple-array', { name: 'sub_genre', nullable: true })
  subGenre?: string[];

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

  @OneToMany(() => Track, (track) => track.genre, {
    cascade: true,
    nullable: true,
  })
  tracks?: Track[];

  @ManyToMany(() => User, (user) => user.genres, { nullable: true })
  @JoinTable()
  users: User[];
}
