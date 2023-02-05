import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from 'src/students/models/student.model';
import { TrainingsController } from 'src/trainings/trainings.controller';
import { TrainingsService } from 'src/trainings/trainings.service';
import { LevelResults } from 'src/trainings/models/level-results.model';
import { StepResults } from 'src/trainings/models/step-results.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TrainingsController],
  providers: [TrainingsService],
  imports: [AuthModule, SequelizeModule.forFeature([Student, LevelResults, StepResults])],
  exports: [TrainingsService],
})
export class TrainingsModule {}
