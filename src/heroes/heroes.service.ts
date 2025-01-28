import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { HeroesRepository } from './heroes.repository';
import { CreateHeroDto } from './dtos/create-hero.dto';
import { Hero } from './heroes.model';
import { DatabaseValidationError } from './errors/database-validation.error';

@Injectable()
export class HeroesService {
  constructor(private readonly repository: HeroesRepository) {}

  getList() {
    return this.repository.findAll();
  }

  create(createHeroDto: CreateHeroDto): Promise<Hero> {
    try {
      return this.repository.create(createHeroDto);
    } catch (error) {
      if (error instanceof DatabaseValidationError) {
        throw new ConflictException(error.errors);
      }
      throw new InternalServerErrorException();
    }
  }
}
