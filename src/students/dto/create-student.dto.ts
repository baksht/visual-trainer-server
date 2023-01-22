import { ApiProperty } from '@nestjs/swagger';

class CreateStudentDto {
  @ApiProperty({ example: 'Иван', description: 'Имя студента' })
  readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия студента' })
  readonly surname: string;
}

export default CreateStudentDto;
