import { Injectable } from '@nestjs/common';
import { HeroesRepository } from './heroes.repository';
import { CreateHeroDto } from './dtos/create-hero.dto';
import { Hero } from './heroes.model';

@Injectable()
export class HeroesService {
  constructor(private readonly repository: HeroesRepository) {}

  getList() {
    return this.repository.findAll();
  }

  create(createHeroDto: CreateHeroDto): Promise<Hero> {
    return this.repository.create(createHeroDto);
  }
}
