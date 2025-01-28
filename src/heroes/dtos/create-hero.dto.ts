import { PickType } from '@nestjs/mapped-types';
import { HeroDto } from './hero.dto';

export class CreateHeroDto extends PickType(HeroDto, [
  'name',
  'superpower',
  'humility',
]) {}
