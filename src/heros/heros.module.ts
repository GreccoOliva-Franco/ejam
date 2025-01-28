import { Module } from '@nestjs/common';
import { HerosService } from './heros.service';
import { HerosController } from './heros.controller';
import { HerosRepository } from './heros.repository';

@Module({
  controllers: [HerosController],
  providers: [HerosService, HerosRepository],
})
export class HerosModule {}
