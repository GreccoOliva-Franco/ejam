import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';
import {
  MAX_HUMILITY_RATING,
  MIN_HUMILITY_RATING,
  MIN_NAME_LENGTH,
  MIN_SUPERPOWER_LENGTH,
} from '../heroes.constants';

export class HeroDto {
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(MIN_NAME_LENGTH)
  name: string;

  @IsString()
  @MinLength(MIN_SUPERPOWER_LENGTH)
  superpower: string;

  @IsNumber()
  @Min(MIN_HUMILITY_RATING)
  @Max(MAX_HUMILITY_RATING)
  humility: number;
}
