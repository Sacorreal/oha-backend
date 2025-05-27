import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Track) private trackRepository: Repository<Track>,
  ) {}

  async create(createPlaylistDto: CreatePlaylistDto) {
    const { userId, name } = createPlaylistDto;
    const userFound = await this.userRepository.findOneBy({ id: userId });
    if (!userFound) throw new NotFoundException('Usuario no encontrado');
    const newPlaylist = this.playlistRepository.create({
      name,
      owner: userFound,
    });
    return this.playlistRepository.save(newPlaylist);
  }

  async addTrack(playlistId: string, trackId: string) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId },
      relations: ['tracks'],
    });
    const track = await this.trackRepository.findOneBy({ id: trackId });
    if (!playlist || !track) throw new NotFoundException();
    if (!playlist.tracks.some((t) => t.id === track.id)) {
      playlist.tracks.push(track);
      await this.playlistRepository.save(playlist);
    }
  }

  async removeTrack(playlistId: string, trackId: string) {
    const playlist = await this.playlistRepository.findOne({
      where: { id: playlistId },
      relations: ['tracks'],
    });
    if (!playlist) throw new NotFoundException();
    playlist.tracks = playlist.tracks.filter((t) => t.id !== trackId);
    await this.playlistRepository.save(playlist);
  }

  findAll() {
    return this.playlistRepository.find();
  }

  findOne(playlistId: string) {
    return this.playlistRepository.findOne({
      where: { id: playlistId },
      relations: ['tracks'],
    });
  }

  update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistRepository.update(id, updatePlaylistDto);
  }

  async deletePlaylist(playlistId: string) {
    await this.playlistRepository.delete(playlistId);
  }
}
