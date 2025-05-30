import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    const { genre, subGenre } = createGenreDto;
    const normalizedGenre = genre.trim().toLowerCase();

    const existing = await this.genreRepository.findOne({
      where: { genre: normalizedGenre },
    });

    if (existing) {
      throw new BadRequestException(`El género "${genre}" ya existe`);
    }

    const defaultSubgenre = 'gospel';
    const normalizedSubgenres = new Set<string>();

    if (Array.isArray(subGenre)) {
      for (const s of subGenre) {
        normalizedSubgenres.add(s.trim().toLowerCase());
      }
    }

    normalizedSubgenres.add(defaultSubgenre);

    const newGenre = this.genreRepository.create({
      genre: normalizedGenre,
      subGenre: Array.from(normalizedSubgenres),
    });

    return this.genreRepository.save(newGenre);
  }

  findAll() {
    return this.genreRepository.find({
      select: ['id', 'genre', 'subGenre'],
    });
  }

  findOne(id: string) {
    return this.genreRepository.findOne({
      select: ['id', 'subGenre', 'tracks'],
      relations: ['tracks'],
    });
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }

  async addGenreToTrack(genreId: string, subGenre: string) {
    const genre = await this.genreRepository.findOne({
      where: { id: genreId },
    });
    if (!genre) {
      throw new NotFoundException('Género no encontrado');
    }
    if (!genre.subGenre.includes(subGenre)) {
      throw new BadRequestException(
        `El subgénero ${subGenre} no pertenece al género seleccionado`,
      );
    }
    return { genre, subGenre };
  }

  async addSubgenreToGenre(
    genreId: string,
    newSubgenre: string,
  ): Promise<Genre> {
    const genre = await this.genreRepository.findOne({
      where: { id: genreId },
    });

    if (!genre) {
      throw new NotFoundException('Género no encontrado');
    }

    const normalized = newSubgenre.trim().toLowerCase();

    if (genre.subGenre.includes(normalized)) {
      throw new BadRequestException(
        `El subgénero "${newSubgenre}" ya existe en el género`,
      );
    }

    genre.subGenre.push(normalized);
    return this.genreRepository.save(genre);
  }
}
