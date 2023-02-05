import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from 'src/students/models/student.model';
import { LoginStudentDto } from 'src/auth/dto/login-student.dto';
import { LevelResults } from 'src/trainings/models/level-results.model';
import { StudentCommonInfoDto } from './dto/student-common-info.dto';
import { StudentDetailInfoDto } from './dto/student-detail-info.dto';
import { StepResults } from 'src/trainings/models/step-results.model';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student) private readonly studentRepository: typeof Student) {}

  public async createStudent(dto: LoginStudentDto): Promise<Student> {
    return await this.studentRepository.create({
      name: dto.name,
      surname: dto.surname,
      isTrainingFinished: false,
    });
  }

  public async getStudentById(id: number): Promise<Student> {
    return await this.studentRepository.findOne({ where: { id } });
  }

  public async getStudentsList(): Promise<StudentCommonInfoDto[]> {
    const students = await this.studentRepository.findAll();

    return students.map((student) => {
      return {
        id: student.id,
        name: student.name,
        surname: student.surname,
        isTrainingFinished: student.isTrainingFinished,
      };
    });
  }

  public async getStudentInfo(id: number): Promise<StudentDetailInfoDto> {
    const studentInfo = await this.studentRepository.findOne({
      where: { id },
      include: [
        {
          model: LevelResults,
          as: 'levelsResults',
          include: [{ model: StepResults, as: 'stepsResults' }],
        },
      ],
    });

    return {
      id: studentInfo.id,
      name: studentInfo.name,
      surname: studentInfo.surname,
      levelsResults: studentInfo.levelsResults.map((levelResults) => {
        return {
          numberOfLevel: levelResults.numberOfLevel,
          referenceViewingTime: levelResults.referenceViewingTime,
          stepsResults: levelResults.stepsResults.map((stepResults) => {
            return {
              isRight: stepResults.isRight,
              stepTime: stepResults.stepTime,
              imageSwitchesNumber: stepResults.imageSwitchesNumber,
            };
          }),
        };
      }),
    };
  }
}
