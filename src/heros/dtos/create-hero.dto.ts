import { OmitType } from '@nestjs/mapped-types';
import { HeroDto } from './hero.dto';

export class CreateHeroDto extends OmitType(HeroDto, ['id']) {}
