import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Student from 'src/students/models/student.model';
import TrainingsController from 'src/trainings/trainings.controller';
import TrainingsService from 'src/trainings/trainings.service';
import LevelResults from 'src/trainings/models/level-results.model';
import StudentsModule from 'src/students/students.module';
import StepResults from 'src/trainings/models/step-results.model';

@Module({
  controllers: [TrainingsController],
  providers: [TrainingsService],
  imports: [
    StudentsModule,
    forwardRef(() =>
      SequelizeModule.forFeature([Student, LevelResults, StepResults]),
    ),
  ],
  exports: [TrainingsService],
})
class TrainingsModule {}

export default TrainingsModule;
