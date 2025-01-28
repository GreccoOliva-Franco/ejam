import { Injectable } from '@nestjs/common';
import { HeroDto } from './dtos/hero.dto';
import { Hero } from './heroes.model';
import { CreateHeroDto } from './dtos/create-hero.dto';
import { MAX_HUMILITY_RATING, MIN_HUMILITY_RATING } from './heroes.constants';
import { DatabaseValidationError } from './errors/database-validation.error';

enum HeroEvent {
  HERO_CREATED = 'hero.created',
}

@Injectable()
export class HeroesRepository {
  private lastId: number = 0;
  private data: HeroDto[] = [];

  findAll(): Promise<Hero[]> {
    const heroList = this.data.map((data) => new Hero(data));

    return Promise.resolve(heroList);
  }

  /**
   *
   * @param createHeroDto
   * @throws DatabaseValidatonError
   */
  create(createHeroDto: CreateHeroDto): Promise<Hero> {
    const errors = this.validate(createHeroDto);
    if (errors.length) {
      throw new DatabaseValidationError(errors);
    }

    const hero = { id: this.getNewId(), ...createHeroDto };
    this.data.push(hero);

    this.trigger(HeroEvent.HERO_CREATED);

    return Promise.resolve(new Hero(hero));
  }

  private getNewId(): number {
    return this.lastId + 1;
  }

  private sortDatabase(): void {
    // NOTE: this MUTATES the array (which is the whole purpose of "sortDatabase" method)
    this.data.sort(byHumilityDescending);

    function byHumilityDescending(firstHero: HeroDto, secondHero: HeroDto) {
      return firstHero.humility - secondHero.humility;
    }
  }

  private incrementIndex() {
    this.lastId = this.lastId + 1;
  }

  private trigger(key: HeroEvent): void {
    switch (key) {
      case HeroEvent.HERO_CREATED: {
        this.incrementIndex();

        // NOTE: optimization for this especific use-case (challenge) to avoid sorting on EVERY dataset read
        this.sortDatabase();
      }
    }
  }

  /**
   * Before insert validations
   * @param createHeroDto
   */
  private validate({ name, superpower, humility }: CreateHeroDto): string[] {
    const errors: string[] = [];

    // "name" validations
    if (typeof name !== 'string') {
      errors.push('Invalid data type - hero.name. Type "string" required');
    }
    const isUniqueName =
      this.data.find((hero) => hero.name === name) === undefined;
    if (!isUniqueName) {
      errors.push('Duplicate key - hero.name');
    }

    // "superpower" validations
    if (typeof superpower !== 'string') {
      errors.push(
        'Invalid data type - hero.superpower. Type "string" required',
      );
    }

    // "humility" validations
    const isValidHumility =
      typeof humility !== 'number' &&
      MIN_HUMILITY_RATING <= humility &&
      humility <= MAX_HUMILITY_RATING;
    if (!isValidHumility) {
      errors.push(
        `Invalid value - hero.humility must be a "number" between ${MIN_HUMILITY_RATING} <= hero.humility <= ${MAX_HUMILITY_RATING}`,
      );
    }

    return errors;
  }
}
