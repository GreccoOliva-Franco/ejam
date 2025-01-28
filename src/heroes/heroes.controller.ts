import { Body, Controller, Get, Post } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { Hero } from './heroes.model';
import { CreateHeroDto } from './dtos/create-hero.dto';

@Controller('superheros')
export class HeroesController {
  constructor(private readonly service: HeroesService) {}

  @Get('')
  getList(): Promise<Hero[]> {
    return this.service.getList();
  }

  @Post()
  create(@Body() createHeroDto: CreateHeroDto): Promise<Hero> {
    return this.service.create(createHeroDto);
  }
}
