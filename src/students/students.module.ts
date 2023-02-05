import { StepResults } from 'src/trainings/models/step-results.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { StudentsController } from 'src/students/students.controller';
import { StudentsService } from 'src/students/students.service';
import { Student } from 'src/students/models/student.model';
import { LevelResults } from 'src/trainings/models/level-results.model';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [SequelizeModule.forFeature([Student, LevelResults, StepResults])],
  exports: [StudentsService],
})
export class StudentsModule {}
