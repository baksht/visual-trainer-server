import { ApiProperty } from '@nestjs/swagger';

class StudentCommonInfoDto {
  @ApiProperty({ example: 37646, description: 'Идентификатор студента' })
  readonly id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя студента' })
  readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия студента' })
  readonly surname: string;

  @ApiProperty({ example: true, description: 'ТренингОкончен' })
  readonly isTrainingFinished: boolean;
}

export default StudentCommonInfoDto;
