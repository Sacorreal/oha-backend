import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { Award } from './entities/award.entity';

@Injectable()
export class AwardService {
  constructor(
    @InjectRepository(Award)
    private readonly awardRepository: Repository<Award>,
  ) {}

  create(createAwardDto: CreateAwardDto) {
    return this.awardRepository.save(createAwardDto);
  }

  findAll(): Promise<Award[]> {
    return this.awardRepository.find();
  }

  async findOne(id: string) {
    const awardFound = await this.awardRepository.findOne({
      where: { id },
      relations: ['tracks.track'],
    });
    if (!awardFound) {
      throw new NotFoundException('Premio no encontrado');
    }
    return awardFound;
  }

  async update(id: string, updateAwardDto: UpdateAwardDto) {
    const award = await this.awardRepository.findOneBy({ id });
    if (!award) {
      throw new NotFoundException('Premio no encontrado');
    }
    await this.awardRepository.update(id, updateAwardDto);
    return this.awardRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const award = await this.awardRepository.findOneBy({ id });
    if (!award) {
      throw new NotFoundException('Premio no encontrado');
    }
    await this.awardRepository.delete(id);
    return { message: 'Premio eliminado con éxito' };
  }
}
