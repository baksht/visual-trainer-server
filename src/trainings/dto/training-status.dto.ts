import { ApiProperty } from '@nestjs/swagger';

export class TrainingStatusDto {
  @ApiProperty({ example: true, description: 'Тренинг начат', required: true })
  public readonly isTrainingStarted: boolean;

  @ApiProperty({
    example: false,
    description: 'Тренинг окончен',
    required: true,
  })
  public readonly isTrainingFinished: boolean;

  @ApiProperty({
    example: 3,
    description: 'Номер следующего уровня',
    required: false,
    minimum: 1,
    maximum: 10,
  })
  public readonly numberOfNextLevel?: number;
}
