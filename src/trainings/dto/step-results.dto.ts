import { ApiProperty } from '@nestjs/swagger';

export class StepResultsDto {
  @ApiProperty({
    example: true,
    description: 'Правильность выполнения шага',
    required: true,
  })
  public readonly isRight: boolean;

  @ApiProperty({
    example: 331326,
    description: 'Время выполнения шага(мс)',
    required: true,
  })
  public readonly stepTime: number;

  @ApiProperty({
    example: 6,
    description: 'Количество переключений изображений(раз)',
    required: true,
  })
  public readonly imageSwitchesNumber: number;
}
