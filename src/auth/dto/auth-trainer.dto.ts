import { ApiProperty } from '@nestjs/swagger';

export class AuthTrainerDto {
  @ApiProperty({ example: 'test@trainer.ru', description: 'Email' })
  public readonly email: string;

  @ApiProperty({ example: 'Иван', description: 'Имя тренера' })
  public readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия тренера' })
  public readonly surname: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество тренера' })
  public readonly patronymic: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXphemEiLCJzdXJuYW1lIjoiYWFhYSIsImlhdCI6MTY3Mjg2MDI5OSwiZXhwIjoxNjcyOTQ2Njk5fQ.Mh08AWiJ8iLIBhsXliRuV6qSvzkzqgk2JgUJxB16djA',
    description: 'Токен авторизации',
  })
  public readonly accessToken: string;
}
