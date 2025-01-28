import { Test } from '@nestjs/testing';
import { HeroesRepository } from './heroes.repository';
import { CreateHeroDto } from './dtos/create-hero.dto';
import { DatabaseValidationError } from './errors/database-validation.error';

describe('HeroesRepository', () => {
  // let modules: any;
  const testHero: CreateHeroDto = {
    name: 'name test',
    superpower: 'superpower test',
    humility: 3,
  };
  let repository: HeroesRepository;

  beforeEach(async () => {
    const modules = await Test.createTestingModule({
      providers: [HeroesRepository],
    }).compile();

    repository = modules.get(HeroesRepository);
  });

  describe('create', () => {
    it('should be defined', async () => {
      expect(repository.findAll).toBeDefined();
    });

    it('should add a hero', async () => {
      const spy = jest.spyOn(repository, 'create');
      const hero = await repository.create(testHero);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(hero).toMatchObject({ id: 1, ...testHero });
    });

    it('should not allow duplicates on hero.name', async () => {
      const spy = jest.spyOn(repository, 'create');
      await repository.create(testHero);

      // This should be possible to write it differently
      try {
        await repository.create(testHero);
      } catch (error) {
        expect(error).toHaveProperty('errors');
        expect(error instanceof DatabaseValidationError).toBe(true);
        expect(
          error.errors.find((message) => /hero.name/.test(message)),
        ).not.toBeUndefined();
      }
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(repository.findAll).toBeDefined();
    });

    it('should return an empty array if there are no heroes', async () => {
      const spy = jest.spyOn(repository, 'findAll');
      const heroes = await repository.findAll();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(heroes).toHaveLength(0);
    });

    it('should return a non-empty array if there are heroes', async () => {
      const spy = jest.spyOn(repository, 'findAll');
      await repository.create(testHero);

      const heroes = await repository.findAll();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(heroes).toHaveLength(1);
      expect(heroes.at(0)).toMatchObject({ ...testHero, id: 1 });
    });
  });
});
