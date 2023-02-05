import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty({ example: '1', description: 'Идентификатор изображения' })
  public readonly id: string;

  @ApiProperty({ example: 1, description: 'Порядок изображения' })
  public readonly order: number;

  @ApiProperty({ example: 1, description: 'Путь к файлу' })
  public readonly image: string;
}
