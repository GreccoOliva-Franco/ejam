import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { HeroesRepository } from './heroes.repository';

@Module({
  controllers: [HeroesController],
  providers: [HeroesService, HeroesRepository],
})
export class HeroesModule {}
