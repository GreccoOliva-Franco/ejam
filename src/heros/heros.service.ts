import { Injectable } from '@nestjs/common';
import { HerosRepository } from './heros.repository';
import { CreateHeroDto } from './dtos/create-hero.dto';
import { Hero } from './heros.model';

@Injectable()
export class HerosService {
  constructor(private readonly repository: HerosRepository) {}

  getList() {
    return this.repository.findAll();
  }

  create(createHeroDto: CreateHeroDto): Promise<Hero> {
    return this.repository.create(createHeroDto);
  }
}
