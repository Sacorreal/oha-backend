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
      message: `el track ha sido creado con exito`,
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

  async addFavorite(userId: string, trackId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoriteTracks'],
    });
    const track = await this.trackRepository.findOneBy({ id: trackId });

    if (!user || !track)
      throw new NotFoundException('Usuario o track no encontrado');

    if (!user.favoriteTracks.find((t) => t.id === trackId)) {
      user.favoriteTracks.push(track);
      await this.userRepository.save(user);
    }
    return user.favoriteTracks;
  }

  async removeFavorite(userId: string, trackId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoriteTracks'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.favoriteTracks = user.favoriteTracks.filter((t) => t.id !== trackId);
    await this.userRepository.save(user);
    return user.favoriteTracks;
  }

  async getFavorites(userId: string): Promise<Track[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoriteTracks'],
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user.favoriteTracks;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.trackRepository.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.trackRepository.delete(id);
  }
}
