import { Body, Controller, Get, Post } from '@nestjs/common';
import { HerosService } from './heros.service';
import { Hero } from './heros.model';
import { CreateHeroDto } from './dtos/create-hero.dto';

@Controller('superheros')
export class HerosController {
  constructor(private readonly service: HerosService) {}

  @Get('')
  getList(): Promise<Hero[]> {
    return this.service.getList();
  }

  @Post()
  create(@Body() createHeroDto: CreateHeroDto): Promise<Hero> {
    return this.service.create(createHeroDto);
  }
}
