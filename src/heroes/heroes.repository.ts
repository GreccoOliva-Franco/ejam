import { Injectable } from '@nestjs/common';
import { HeroDto } from './dtos/hero.dto';
import { Hero } from './heroes.model';
import { CreateHeroDto } from './dtos/create-hero.dto';

@Injectable()
export class HeroesRepository {
  private lastId: number = 0;
  private data: HeroDto[] = [];

  findAll(): Promise<Hero[]> {
    const heroList = this.data.map((data) => new Hero(data));

    return Promise.resolve(heroList);
  }

  create(createHeroDto: CreateHeroDto): Promise<Hero> {
    const hero = { id: this.getNewId(), ...createHeroDto };
    this.data.push(hero);

    // NOTE: optimization for this especific use-case (challenge) to avoid sorting on EVERY dataset read
    this.sortDatabase();

    return Promise.resolve(new Hero(hero));
  }

  private getNewId(): number {
    return this.lastId + 1;
  }

  private sortDatabase(): void {
    const byHumilityDescending = (firstHero: HeroDto, secondHero: HeroDto) =>
      firstHero.humility - secondHero.humility;

    // NOTE: this MUTATES the array (which is the whole purpose of "sortDatabase" method)
    this.data.sort(byHumilityDescending);
  }
}
