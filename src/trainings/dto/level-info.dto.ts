import { ApiProperty } from '@nestjs/swagger';
import ImageDto from 'src/trainings/dto/image.dto';

class LevelInfoDto {
  @ApiProperty({
    example: 1,
    description: 'Номер уровня',
    minimum: 1,
    maximum: 10,
  })
  readonly numberOfLevel: number;

  @ApiProperty({
    example: [{ id: 1, order: 1, image: 'training/math/level_1/1.jpg' }],
    description: 'Массив изображений',
    isArray: true,
  })
  readonly images: ImageDto[];
}

export default LevelInfoDto;
