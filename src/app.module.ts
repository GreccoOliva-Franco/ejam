import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [ConfigModule.forRoot(), HeroesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
