import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from 'src/playlist/entities/playlist.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from './entities/user-role.enum';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.save(createUserDto);
    return {
      message: 'Usuario creado con éxito',
      id: newUser.id,
    };
  }

  findAll() {
    return this.userRepository.find();
  }

  findAllAuthors() {
    return this.userRepository.find({
      where: { role: In([UserRole.AUTOR, UserRole.CANTAUTOR]) },
    });
  }

  async findOneAuthor(id: string) {
    const authorFound = await this.userRepository.find({
      where: {
        id,
        role: In([UserRole.AUTOR, UserRole.CANTAUTOR]),
      },
      relations: ['tracks'],
    });
    if (authorFound.length === 0)
      throw new NotFoundException(
        'Id no corresponde a perfil de autor ó cantautor',
      );

    return authorFound;
  }

  async findOne(id: string) {
    const userFound = await this.userRepository.findOneBy({ id });

    if (!userFound) {
      throw new NotFoundException('Usuario no existe');
    }
    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no existe');
    }
    await this.userRepository.delete(id);
    return { message: 'Usuario eliminado con éxito' };
  }
}
