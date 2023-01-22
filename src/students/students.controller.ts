import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import StudentsService from 'src/students/students.service';
import CreateStudentDto from 'src/students/dto/create-student.dto';
import LoginDto from 'src/students/dto/login.dto';
import JwtAuthGuard from 'src/students/guards/jwt-auth.guard';
import StudentCommonInfoDto from 'src/students/dto/student-common-info.dto';
import StudentDetailInfoDto from 'src/students/dto/student-detail-info.dto';

@ApiTags('Студент')
@Controller('student')
class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Авторизация студента' })
  @ApiResponse({ status: 201, type: LoginDto })
  @Post('login')
  login(@Body() studentDto: CreateStudentDto): Promise<LoginDto> {
    return this.studentsService.login(studentDto);
  }

  @ApiOperation({ summary: 'Проверка авторизации студента' })
  @ApiResponse({ status: 200, type: CreateStudentDto })
  @UseGuards(JwtAuthGuard)
  @Get('isAuth')
  isAuth(@Request() req): Promise<CreateStudentDto> {
    return this.studentsService.checkAuth(
      req.user.studentId,
      req.user.name,
      req.user.surname,
    );
  }

  @ApiOperation({ summary: 'Список всех студентов' })
  @ApiResponse({ status: 200, type: LoginDto })
  @Get('list')
  getStudentsList(): Promise<StudentCommonInfoDto[]> {
    return this.studentsService.getStudentsList();
  }

  @ApiOperation({ summary: 'Получить информацию о студенте' })
  @ApiResponse({ status: 200, type: StudentDetailInfoDto })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Идентификатор студента',
    type: 'integer',
    example: 1,
  })
  @Get(':id')
  getStudentInfo(@Param() params): Promise<StudentDetailInfoDto> {
    return this.studentsService.getStudentInfo(params.id);
  }
}

export default StudentsController;
