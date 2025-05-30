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

  update(id: number, updateAwardDto: UpdateAwardDto) {
    return `This action updates a #${id} award`;
  }

  remove(id: number) {
    return `This action removes a #${id} award`;
  }
}
