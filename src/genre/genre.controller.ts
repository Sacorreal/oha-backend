import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.createGenre(createGenreDto);
  }

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  @Patch(':genreId')
  update(
    @Param('genreId') genreId: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genreService.addSubgenreToGenre(
      genreId,
      updateGenreDto.subGenre,
    );
  }
}
