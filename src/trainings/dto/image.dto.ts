import { ApiProperty } from '@nestjs/swagger';

class ImageDto {
  @ApiProperty({ example: '1', description: 'Идентификатор изображения' })
  readonly id: string;

  @ApiProperty({ example: 1, description: 'Порядок изображения' })
  readonly order: number;

  @ApiProperty({ example: 1, description: 'Путь к файлу' })
  readonly image: string;
}

export default ImageDto;
