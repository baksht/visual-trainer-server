import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import ImageDto from 'src/trainings/dto/image.dto';
import * as fs from 'fs';
import * as path from 'path';
import LevelResultsDto from 'src/trainings/dto/level-results.dto';
import LevelResults from 'src/trainings/models/level-results.model';
import TrainingStatusDto from 'src/trainings/dto/training-status.dto';
import LevelInfoDto from 'src/trainings/dto/level-info.dto';
import StepResults from 'src/trainings/models/step-results.model';
import Student from 'src/students/models/student.model';

@Injectable()
class TrainingsService {
  constructor(
    @InjectModel(LevelResults)
    private levelResultsRepository: typeof LevelResults,
    @InjectModel(StepResults)
    private stepResultsRepository: typeof StepResults,
    @InjectModel(Student)
    private studentRepository: typeof Student,
  ) {}

  async levelComplete(
    studentId: number,
    levelResults: LevelResultsDto,
  ): Promise<TrainingStatusDto> {
    const levelResultEntry = await this.levelResultsRepository.create({
      studentId,
      numberOfLevel: levelResults.numberOfLevel,
      referenceViewingTime: levelResults.referenceViewingTime,
    });

    for (const stepResults of levelResults.stepsResults) {
      await this.stepResultsRepository.create({
        isRight: stepResults.isRight,
        stepTime: stepResults.stepTime,
        imageSwitchesNumber: stepResults.imageSwitchesNumber,
        levelResultsId: levelResultEntry.id,
      });
    }

    const isTrainingFinished =
      levelResults.numberOfLevel === 10 &&
      levelResults.stepsResults.every((stepResults) => stepResults.isRight);

    if (isTrainingFinished) {
      await this.studentRepository.update(
        { isTrainingFinished: isTrainingFinished },
        { where: { id: studentId } },
      );
    }

    return await this.getTrainingStatus(studentId);
  }

  private getNextLevel(levelResults: LevelResultsDto): number {
    const numberOfSteps = levelResults.stepsResults.length;
    const numberOfErrors = levelResults.stepsResults.reduce<number>(
      (acc, curr) => (!curr.isRight ? acc + 1 : acc),
      0,
    );

    const errorRate = numberOfErrors / numberOfSteps;

    console.log('Количество шагов ' + numberOfSteps);
    console.log('Количество ошибок ' + numberOfErrors);
    console.log('Коэффициент ошибок ' + errorRate);

    switch (true) {
      case errorRate === 0:
        return 10;
      case errorRate < 0.05:
        return 9;
      case errorRate < 0.1:
        return 8;
      case errorRate < 0.15:
        return 7;
      case errorRate < 0.2:
        return 6;
      case errorRate < 0.25:
        return 5;
      case errorRate < 0.3:
        return 4;
      case errorRate < 0.35:
        return 3;
      case errorRate < 0.4:
        return 2;
      default:
        return 1;
    }
  }

  async getLevel(numberOfLevel: string): Promise<LevelInfoDto> {
    if (!Number.isNaN(Number(numberOfLevel))) {
      return {
        numberOfLevel: Number(numberOfLevel),
        images: this.getLevelImages(Number(numberOfLevel)),
      };
    }

    // Впоследствии удалить и обработать ошибку
    return {
      numberOfLevel: 1,
      images: this.getLevelImages(1),
    };
  }

  async getTrainingStatus(studentId: number): Promise<TrainingStatusDto> {
    const studentInfo = await this.studentRepository.findOne({
      where: { id: studentId },
      include: [
        {
          model: LevelResults,
          as: 'levelsResults',
          include: [{ model: StepResults, as: 'stepsResults' }],
        },
      ],
    });

    if (studentInfo.isTrainingFinished) {
      return {
        isTrainingStarted: true,
        isTrainingFinished: true,
      };
    }

    if (!studentInfo.levelsResults.length) {
      return {
        isTrainingStarted: false,
        isTrainingFinished: false,
        numberOfNextLevel: 1,
      };
    }

    const lastCompletedLevel =
      studentInfo.levelsResults[studentInfo.levelsResults.length - 1];

    const lastCompletedLevelResults = {
      numberOfLevel: lastCompletedLevel.numberOfLevel,
      referenceViewingTime: lastCompletedLevel.referenceViewingTime,
      stepsResults: lastCompletedLevel.stepsResults.map((stepResults) => {
        return {
          isRight: stepResults.isRight,
          stepTime: stepResults.stepTime,
          imageSwitchesNumber: stepResults.imageSwitchesNumber,
        };
      }),
    };

    return {
      isTrainingStarted: true,
      isTrainingFinished: false,
      numberOfNextLevel: this.getNextLevel(lastCompletedLevelResults),
    };
  }

  private getLevelImages(numberOfLevel: number): ImageDto[] {
    // Временное решение(подумать над хранением файлов в бинарниках postgres, когда будет доступна админ панель)
    const levelPath = `training/math/level_${numberOfLevel}`;
    const filePath = path.resolve(__dirname, '..', 'static', levelPath);

    return fs
      .readdirSync(filePath, { withFileTypes: true })
      .map((image, index) => {
        return {
          id: String(index),
          order: index,
          image: `${levelPath}/${image.name}`,
        };
      });
  }
}

export default TrainingsService;
