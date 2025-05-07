import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { InvitedUser } from './entities/invited-user.entity';
import { InvitedUserController } from './invited-user.controller';
import { InvitedUserService } from './invited-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([InvitedUser, User])],
  controllers: [InvitedUserController],
  providers: [InvitedUserService],
})
export class InvitedUserModule {}
