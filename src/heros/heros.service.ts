import { Injectable } from '@nestjs/common';
import { HerosRepository } from './heros.repository';

@Injectable()
export class HerosService {
  constructor(private readonly repository: HerosRepository) {}

  getList() {
    return this.repository.findAll();
  }
}
