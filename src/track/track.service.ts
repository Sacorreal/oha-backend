import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackResponseDto } from './dto/track-response.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    if (createTrackDto.authors) {
      const authors = await this.userRepository.findBy({
        id: In(createTrackDto.authors),
      });
      createTrackDto.authors = authors;
    }
    const newTrack = await this.trackRepository.save(createTrackDto);
    return {
      message: `el track con el id ${newTrack.id} ha sido creado con exito`,
      id: newTrack.id,
    };
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string): Promise<TrackResponseDto> {
    const trackFound = await this.trackRepository.findOne({
      where: { id },
      relations: ['authors'],
    });
    if (!trackFound) {
      throw new NotFoundException('Track no encontrado');
    }
    return plainToInstance(TrackResponseDto, trackFound, {
      excludeExtraneousValues: true,
    });
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
  }
}
