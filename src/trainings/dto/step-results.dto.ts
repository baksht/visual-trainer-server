import { ApiProperty } from '@nestjs/swagger';

class StepResultsDto {
  @ApiProperty({
    example: true,
    description: 'Правильность выполнения шага',
    required: true,
  })
  readonly isRight: boolean;

  @ApiProperty({
    example: 331326,
    description: 'Время выполнения шага(мс)',
    required: true,
  })
  readonly stepTime: number;

  @ApiProperty({
    example: 6,
    description: 'Количество переключений изображений(раз)',
    required: true,
  })
  readonly imageSwitchesNumber: number;
}

export default StepResultsDto;
