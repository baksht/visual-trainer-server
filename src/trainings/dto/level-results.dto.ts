import { ApiProperty } from '@nestjs/swagger';
import { StepResultsDto } from './step-results.dto';

export class LevelResultsDto {
  @ApiProperty({ example: 1, description: 'Номер уровня', required: true })
  public readonly numberOfLevel: number;

  @ApiProperty({
    example: 13132,
    description: 'Время предварительного просмотра изображения(мс)',
    required: true,
  })
  public readonly referenceViewingTime: number;

  @ApiProperty({
    example: [{ isRight: true, stepTime: 331326, imageSwitchesNumber: 6 }],
    description: 'Массив результатов ',
    isArray: true,
  })
  public readonly stepsResults: StepResultsDto[];
}
