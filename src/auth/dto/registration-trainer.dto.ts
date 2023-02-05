import { ApiProperty } from '@nestjs/swagger';

export class RegistrationTrainerDto {
  @ApiProperty({ example: 'test@trainer.ru', description: 'Email' })
  public readonly email: string;

  @ApiProperty({ example: 'Иван', description: 'Имя тренера' })
  public readonly name: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия тренера' })
  public readonly surname: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество тренера' })
  public readonly patronymic: string;

  @ApiProperty({ example: 'qwerty12345', description: 'Пароль' })
  public readonly password: string;
}
