import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HerosModule } from './heros/heros.module';

@Module({
  imports: [ConfigModule.forRoot(), HerosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
