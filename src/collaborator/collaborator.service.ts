import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';
import { Collaborator } from './entities/collaborator.entity';

@Injectable()
export class CollaboratorService {
  constructor(
    @InjectRepository(Collaborator)
    private readonly collaboratorRepository: Repository<Collaborator>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateCollaboratorDto): Promise<Collaborator> {
    const invitedBy = await this.userRepository.findOneBy({
      id: dto.invitedBy,
    });
    if (!invitedBy) throw new NotFoundException('Usuario no encontrado');
    const exists = await this.collaboratorRepository.findOneBy({
      email: dto.email,
    });
    if (exists) throw new ConflictException('Colaborador ya existe');
    const newCollaborator = this.collaboratorRepository.create({
      name: dto.name,
      email: dto.email,
      invitedBy,
    });
    return this.collaboratorRepository.save(newCollaborator);
  }

  async findAllByOwner(invitedById: string): Promise<Collaborator[]> {
    return this.collaboratorRepository.find({
      where: { invitedBy: { id: invitedById } },
    });
  }

  findOne(collabId: string, invitedById: string) {
    return this.collaboratorRepository.findOne({
      where: {
        invitedBy: { id: invitedById },
        id: collabId,
      },
      relations: ['playlists'],
    });
  }

  async update(
    id: string,
    updateCollaboratorDto: UpdateCollaboratorDto,
  ): Promise<Collaborator> {
    const collab = await this.collaboratorRepository.findOneBy({ id });
    if (!collab) throw new NotFoundException();
    Object.assign(collab, updateCollaboratorDto);
    return this.collaboratorRepository.save(collab);
  }

  remove(id: number) {
    return `This action removes a #${id} collaborator`;
  }
}
