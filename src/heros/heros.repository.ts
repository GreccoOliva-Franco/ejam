import { Injectable } from '@nestjs/common';
import { HeroDto } from './dtos/hero.dto';
import { Hero } from './heros.model';

@Injectable()
export class HerosRepository {
  private data: HeroDto[] = [];

  constructor() {}

  findAll(): Promise<Hero[]> {
    return Promise.resolve(this.data.map((data) => new Hero(data)));
  }
}
