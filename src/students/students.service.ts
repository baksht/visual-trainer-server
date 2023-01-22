import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import Student from 'src/students/models/student.model';
import CreateStudentDto from 'src/students/dto/create-student.dto';
import LoginDto from 'src/students/dto/login.dto';
import LevelResults from 'src/trainings/models/level-results.model';
import StudentCommonInfoDto from './dto/student-common-info.dto';
import StudentDetailInfoDto from './dto/student-detail-info.dto';
import StepResults from 'src/trainings/models/step-results.model';

@Injectable()
class StudentsService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,

    private jwtService: JwtService,
  ) {}

  async login(dto: CreateStudentDto): Promise<LoginDto> {
    const student = await this.studentRepository.create({
      name: dto.name,
      surname: dto.surname,
      isTrainingFinished: false,
    });

    const accessToken = await this.generateToken(
      student.id,
      student.name,
      student.surname,
    );

    return { name: student.name, surname: student.surname, accessToken };
  }

  async checkAuth(
    studentId: number,
    name: string,
    surname: string,
  ): Promise<LoginDto> {
    const accessToken = await this.generateToken(studentId, name, surname);

    return { name, surname, accessToken };
  }

  async getStudentsList(): Promise<StudentCommonInfoDto[]> {
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

  async getStudentInfo(id: number): Promise<StudentDetailInfoDto> {
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

  private async generateToken(
    studentId: number,
    name: string,
    surname: string,
  ): Promise<string> {
    const payload = { studentId, name, surname };

    return this.jwtService.sign(payload);
  }
}

export default StudentsService;
