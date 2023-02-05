import { ApiProperty } from '@nestjs/swagger';

export class LoginTrainerDto {
  @ApiProperty({ example: 'test@trainer.ru', description: 'Email' })
  public readonly email: string;

  @ApiProperty({ example: 'qwerty12345', description: 'Пароль' })
  public readonly password: string;
}
