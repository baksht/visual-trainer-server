import { ApiProperty } from '@nestjs/swagger';

class TrainingStatusDto {
  @ApiProperty({ example: true, description: 'Тренинг начат', required: true })
  readonly isTrainingStarted: boolean;

  @ApiProperty({
    example: false,
    description: 'Тренинг окончен',
    required: true,
  })
  readonly isTrainingFinished: boolean;

  @ApiProperty({
    example: 3,
    description: 'Номер следующего уровня',
    required: false,
    minimum: 1,
    maximum: 10,
  })
  readonly numberOfNextLevel?: number;
}

export default TrainingStatusDto;
