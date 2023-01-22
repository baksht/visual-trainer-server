import { ApiProperty } from '@nestjs/swagger';
import StepResultsDto from './step-results.dto';

class LevelResultsDto {
  @ApiProperty({ example: 1, description: 'Номер уровня', required: true })
  readonly numberOfLevel: number;

  @ApiProperty({
    example: 13132,
    description: 'Время предварительного просмотра изображения(мс)',
    required: true,
  })
  readonly referenceViewingTime: number;

  @ApiProperty({
    example: [{ isRight: true, stepTime: 331326, imageSwitchesNumber: 6 }],
    description: 'Массив результатов ',
    isArray: true,
  })
  readonly stepsResults: StepResultsDto[];
}

export default LevelResultsDto;
