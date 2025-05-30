import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Collaborator } from 'src/collaborator/entities/collaborator.entity';
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
    @InjectRepository(Collaborator)
    private collaboratorRepository: Repository<Collaborator>,
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
      relations: ['tracks', 'owner', 'collaborators'],
    });
  }

  async update(id: string, updatePlaylistDto: UpdatePlaylistDto) {
    const playlist = await this.playlistRepository.findOneBy({ id });
    if (!playlist) {
      throw new NotFoundException('Playlist no encontrada');
    }
    await this.playlistRepository.update(id, updatePlaylistDto);
    return this.playlistRepository.findOneBy({ id });
  }

  async deletePlaylist(playlistId: string) {
    const playlist = await this.playlistRepository.findOneBy({
      id: playlistId,
    });
    if (!playlist) {
      throw new NotFoundException('Playlist no encontrada');
    }
    await this.playlistRepository.delete(playlistId);
    return { message: 'Playlist eliminada con éxito' };
  }

  //TODO: crear colaboradores ilimitados.
  async addCollabToPlaylist(playlistId: string, collaboratorId: string) {
    const playlist = await this.playlistRepository.findOneBy({
      id: playlistId,
    });

    const collaborator = await this.collaboratorRepository.findOneBy({
      id: collaboratorId,
    });
    if (!playlist || !collaborator) throw new NotFoundException();
    playlist.collaborators.push(collaborator);
    return await this.playlistRepository.save(playlist);
  }

  async updateStatusPlaylist(invitationId: string, dto: any) {
    /*return this.invitationRepository.update(invitationId, dto);*/
  }
}
