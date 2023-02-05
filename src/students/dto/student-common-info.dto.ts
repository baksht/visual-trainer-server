import { ApiProperty } from '@nestjs/swagger';

export class StudentCommonInfoDto {
  @ApiProperty({ example: 37646, description: 'Идентификатор студента' })
  public readonly id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя студента' })
  public readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия студента' })
  public readonly surname: string;

  @ApiProperty({ example: true, description: 'ТренингОкончен' })
  public readonly isTrainingFinished: boolean;
}
