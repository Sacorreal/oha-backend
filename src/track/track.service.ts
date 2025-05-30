import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Award } from 'src/award/entities/award.entity';
import { GenreService } from 'src/genre/genre.service';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateTrackAwardDto } from './dto/create-track-award.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackResponseDto } from './dto/track-response.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackAward } from './entities/track-award.entity';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Award)
    private readonly awardRepository: Repository<Award>,
    @InjectRepository(TrackAward)
    private readonly trackAwardRepository: Repository<TrackAward>,
    private readonly genreService: GenreService,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const authors = await this.userRepository.findBy({
      id: In(createTrackDto.authors),
    });

    if (authors.length === 0) {
      throw new NotFoundException('Autor no encontrado');
    }
    createTrackDto.authors = authors;

    const { genre, subGenre } = await this.genreService.addGenreToTrack(
      createTrackDto.genre,
      createTrackDto.subGenre,
    );

    const newTrack = this.trackRepository.create({
      ...createTrackDto,
      genre,
      subGenre,
    });

    await this.trackRepository.save(newTrack);

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
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Track no encontrado');
    }
    const partialUpdate: any = { ...updateTrackDto };
    if (updateTrackDto.genre) {
      partialUpdate.genre = { id: updateTrackDto.genre };
    }
    await this.trackRepository.update(id, partialUpdate);
    return this.trackRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const track = await this.trackRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('Track no encontrado');
    }
    await this.trackRepository.delete(id);
    return { message: 'Track eliminado con éxito' };
  }

  async createTrackAward(data: CreateTrackAwardDto) {
    if (data.award) {
      const awardFound = await this.awardRepository.findOneBy({
        id: data.award.id,
      });
      data.award = awardFound;
    }
    if (data.track) {
      const trackFound = await this.trackRepository.findOneBy({
        id: data.track.id,
      });
      data.track = trackFound;
    }
    const newTrackAward = this.trackAwardRepository.create(data);
    return this.trackAwardRepository.save(newTrackAward);
  }
}
