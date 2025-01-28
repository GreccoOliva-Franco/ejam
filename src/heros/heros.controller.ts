import { Controller, Get } from '@nestjs/common';
import { HerosService } from './heros.service';

@Controller('superheros')
export class HerosController {
  constructor(private readonly service: HerosService) {}

  @Get('')
  getList() {
    return this.service.getList();
  }
}
