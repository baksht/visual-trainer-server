import { ApiProperty } from '@nestjs/swagger';

export class LoginStudentDto {
  @ApiProperty({ example: 'Иван', description: 'Имя студента' })
  public readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия студента' })
  public readonly surname: string;
}
