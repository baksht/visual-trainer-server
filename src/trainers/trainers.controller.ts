import { Controller, Get } from '@nestjs/common';
import { TrainersService } from 'src/trainers/trainers.service';

@Controller('trainers')
export class TrainersController {
  constructor(private trainersService: TrainersService) {}

  @Get()
  public getAll() {
    return this.trainersService.getAllTrainers();
  }
}
