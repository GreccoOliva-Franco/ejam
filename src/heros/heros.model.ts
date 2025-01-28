import { Injectable } from '@nestjs/common';
import { HeroDto } from './dtos/hero.dto';

@Injectable()
export class Hero {
  constructor(heroDto: HeroDto) {
    Object.entries(heroDto).forEach(([prop, value]) => {
      this[prop] = value;
    });
  }
}
