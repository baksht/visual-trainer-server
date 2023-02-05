import { AuthTrainerDto } from 'src/auth/dto/auth-trainer.dto';
import { RegistrationTrainerDto } from 'src/auth/dto/registration-trainer.dto';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginTrainerDto } from 'src/auth/dto/login-trainer.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthStudentDto } from 'src/auth/dto/auth-student.dto';
import { LoginStudentDto } from 'src/auth/dto/login-student.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация тренера' })
  @ApiResponse({ status: 200, type: AuthTrainerDto })
  @Post('trainer/registration')
  public registrationTrainer(@Body() createTrainerDto: RegistrationTrainerDto): Promise<AuthTrainerDto> {
    return this.authService.registrationTrainer(createTrainerDto);
  }

  @ApiOperation({ summary: 'Авторизация тренера' })
  @ApiResponse({ status: 200, type: AuthTrainerDto })
  @Post('trainer/login')
  public loginTrainer(@Body() loginTrainerDto: LoginTrainerDto): Promise<AuthTrainerDto> {
    return this.authService.loginTrainer(loginTrainerDto);
  }

  @ApiOperation({ summary: 'Проверка авторизации Тренера' })
  @ApiResponse({ status: 200, type: AuthTrainerDto })
  @UseGuards(JwtAuthGuard)
  @Get('trainer/isAuth')
  public checkAuthTrainer(@Request() req): Promise<AuthTrainerDto> {
    return this.authService.checkAuthTrainer(req.user.id);
  }

  @ApiOperation({ summary: 'Авторизация студента' })
  @ApiResponse({ status: 200, type: AuthStudentDto })
  @Post('student/login')
  public login(@Body() studentDto: LoginStudentDto): Promise<AuthStudentDto> {
    return this.authService.loginStudent(studentDto);
  }

  @ApiOperation({ summary: 'Проверка авторизации студента' })
  @ApiResponse({ status: 200, type: AuthStudentDto })
  @UseGuards(JwtAuthGuard)
  @Get('student/isAuth')
  public isAuth(@Request() req): Promise<AuthStudentDto> {
    console.log(req);
    return this.authService.checkAuthStudent(req.user.id);
  }
}
