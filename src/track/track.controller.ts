import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@Controller('track')
@UseInterceptors(ClassSerializerInterceptor)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Post('/favorites/:userId/:trackId')
  addFavorite(
    @Param('userId') userId: string,
    @Param('trackId') trackId: string,
  ) {
    return this.trackService.addFavorite(userId, trackId);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }

  @Delete('/favorites/:trackId/:userId')
  removeFavorite(
    @Param('userId') userId: string,
    @Param('trackId') trackId: string,
  ) {
    return this.trackService.removeFavorite(userId, trackId);
  }
  @Get('/favorites/:userId')
  getFavorites(@Param('userId') userId: string) {
    return this.trackService.getFavorites(userId);
  }
}
