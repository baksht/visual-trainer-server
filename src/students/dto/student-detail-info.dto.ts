import LevelResultsDto from 'src/trainings/dto/level-results.dto';
import { ApiProperty } from '@nestjs/swagger';

class StudentDetailInfoDto {
  @ApiProperty({ example: 37646, description: 'Идентификатор студента' })
  readonly id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя студента' })
  readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия студента' })
  readonly surname: string;

  @ApiProperty({
    example: {
      numberOfLevel: 1,
      referenceViewingTime: 13132,
      stepsResults: [
        { isRight: true, stepTime: 331326, imageSwitchesNumber: 6 },
      ],
    },
    description: 'Результаты уровня',
  })
  readonly levelsResults: LevelResultsDto[];
}

export default StudentDetailInfoDto;
