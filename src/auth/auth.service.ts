import { TrainersService } from 'src/trainers/trainers.service';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';

import { RegistrationTrainerDto } from 'src/auth/dto/registration-trainer.dto';
import { LoginTrainerDto } from 'src/auth/dto/login-trainer.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { AuthTrainerDto } from 'src/auth/dto/auth-trainer.dto';
import { Trainer } from 'src/trainers/models/trainer.model';
import { AuthStudentDto } from 'src/auth/dto/auth-student.dto';
import { LoginStudentDto } from 'src/auth/dto/login-student.dto';
import { StudentsService } from 'src/students/students.service';
import { Student } from 'src/students/models/student.model';

@Injectable()
export class AuthService {
  constructor(
    private trainersService: TrainersService,
    private studentsService: StudentsService,
    private jwtService: JwtService,
  ) {}

  public async registrationTrainer(createTrainerDto: RegistrationTrainerDto): Promise<AuthTrainerDto> {
    const candidate = await this.trainersService.getTrainerByEmail(createTrainerDto.email);

    if (candidate) {
      throw new HttpException('Пользователь с таким email уже существует!', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await hash(createTrainerDto.password, 5);

    const trainer = await this.trainersService.createTrainer({ ...createTrainerDto, password: hashPassword });

    return this.generateAuthTrainerInfo(trainer);
  }

  public async loginTrainer(loginTrainerDto: LoginTrainerDto): Promise<AuthTrainerDto> {
    const trainer = await this.validateTrainer(loginTrainerDto);

    return this.generateAuthTrainerInfo(trainer);
  }

  public async checkAuthTrainer(id: number): Promise<AuthTrainerDto> {
    const trainer = await this.trainersService.getTrainerById(id);

    return this.generateAuthTrainerInfo(trainer);
  }

  public async loginStudent(loginStudentDto: LoginStudentDto): Promise<AuthStudentDto> {
    const student = await this.studentsService.createStudent(loginStudentDto);

    return this.generateAuthStudentInfo(student);
  }

  public async checkAuthStudent(id: number): Promise<AuthStudentDto> {
    const student = await this.studentsService.getStudentById(id);

    return this.generateAuthStudentInfo(student);
  }

  private async generateAuthTrainerInfo(trainer: Trainer): Promise<AuthTrainerDto> {
    const accessToken = await this.generateToken(trainer.id);

    return {
      email: trainer.email,
      name: trainer.name,
      surname: trainer.surname,
      patronymic: trainer.patronymic,
      accessToken,
    };
  }

  private async generateAuthStudentInfo(student: Student): Promise<AuthStudentDto> {
    const accessToken = await this.generateToken(student.id);

    return { name: student.name, surname: student.surname, accessToken };
  }

  private async generateToken(id: number): Promise<string> {
    // Добавить информацию о роли пользователя "студент/тренер" и написать соответствующий guard для доступа к эндпоинтам
    const payload = { id };

    return this.jwtService.sign(payload);
  }

  private async validateTrainer(loginTrainerDto: LoginTrainerDto): Promise<Trainer> {
    const trainer = await this.trainersService.getTrainerByEmail(loginTrainerDto.email);

    const passwordEquals = await compare(loginTrainerDto.password, trainer.password);

    if (!trainer || !passwordEquals) {
      throw new UnauthorizedException({ message: 'Неверный email или пароль!' });
    }

    return trainer;
  }
}
