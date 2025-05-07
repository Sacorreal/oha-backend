import { InvitedUser } from 'src/invited-user/entities/invited-user.entity';
import { Track } from 'src/track/entities/track.entity';
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

export enum RoleUser {
  ADMIN = 'admin',
  AUTHOR = 'author',
  INTERPRETER = 'interpreter',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { name: 'last_name' })
  lastName: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { name: 'country_code' })
  countryCode: string;

  @Column('int')
  phone: number;

  @Column('varchar', { name: 'type_citizen_id' })
  typeCitizenID: string;

  @Column('int', { name: 'citizen_id' })
  citizenID: number;

  @Column({
    name: 'role_user',
    type: 'enum',
    enum: RoleUser,
  })
  role: RoleUser;

  @Column('varchar', { nullable: false })
  genre: string[];

  @Column('simple-json', { name: 'social_networks' })
  socialNetworks: Record<string, string>;

  @Column('varchar', { name: 'image_url', nullable: true })
  imageUrl: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column('boolean', { default: false })
  verified: boolean;

  @ManyToMany(() => Track, (track) => track.authors, { nullable: true })
  @JoinTable()
  tracks: Track[];

  @OneToMany(() => InvitedUser, (invitedUser) => invitedUser.id, {
    nullable: true,
  })
  invitedUsers: InvitedUser[];

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
