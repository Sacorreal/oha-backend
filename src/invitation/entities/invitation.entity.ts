import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.invitationsSent, {
    onDelete: 'CASCADE',
  })
  inviter: User;

  @Column('varchar', { name: 'url_invitation', nullable: true })
  urlInvitation?: string;

  @Column({ default: false })
  accepted: boolean;

  @Column({
    type: 'timestamp',
    name: 'invited_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  invitedAt: Date;

  @Column({ type: 'timestamp', name: 'accepted_at', nullable: true })
  acceptedAt?: Date;
}
