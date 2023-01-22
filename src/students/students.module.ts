import StepResults from 'src/trainings/models/step-results.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import StudentsController from 'src/students/students.controller';
import StudentsService from 'src/students/students.service';
import Student from 'src/students/models/student.model';
import LevelResults from 'src/trainings/models/level-results.model';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService],
  imports: [
    forwardRef(() =>
      SequelizeModule.forFeature([Student, LevelResults, StepResults]),
    ),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [StudentsService, JwtModule],
})
class StudentsModule {}

export default StudentsModule;
