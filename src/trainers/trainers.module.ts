import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { TrainersService } from 'src/trainers/trainers.service';
import { TrainersController } from 'src/trainers/trainers.controller';
import { Trainer } from 'src/trainers/models/trainer.model';

@Module({
  providers: [TrainersService],
  controllers: [TrainersController],
  imports: [SequelizeModule.forFeature([Trainer])],
  exports: [TrainersService],
})
export class TrainersModule {}
