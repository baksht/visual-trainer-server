import { ApiProperty } from '@nestjs/swagger';

class LoginDto {
  @ApiProperty({ example: 'Иван', description: 'Имя студента', required: true })
  readonly name: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия студента',
    required: true,
  })
  readonly surname: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYXphemEiLCJzdXJuYW1lIjoiYWFhYSIsImlhdCI6MTY3Mjg2MDI5OSwiZXhwIjoxNjcyOTQ2Njk5fQ.Mh08AWiJ8iLIBhsXliRuV6qSvzkzqgk2JgUJxB16djA',
    description: 'Токен авторизации',
  })
  readonly accessToken: string;
}

export default LoginDto;
