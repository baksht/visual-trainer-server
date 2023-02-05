import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trainer } from 'src/trainers/models/trainer.model';
import { RegistrationTrainerDto } from 'src/auth/dto/registration-trainer.dto';

@Injectable()
export class TrainersService {
  constructor(@InjectModel(Trainer) private trainerRepository: typeof Trainer) {}

  public async createTrainer(dto: RegistrationTrainerDto): Promise<Trainer> {
    const trainer = await this.trainerRepository.create(dto);

    return trainer;
  }

  public async getAllTrainers(): Promise<Trainer[]> {
    return await this.trainerRepository.findAll();
  }

  public async getTrainerByEmail(email: string): Promise<Trainer> {
    return await this.trainerRepository.findOne({ where: { email } });
  }
}
