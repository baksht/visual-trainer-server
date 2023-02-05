import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';
import { AuthStudentDto } from 'src/auth/dto/auth-student.dto';
import { StudentCommonInfoDto } from 'src/students/dto/student-common-info.dto';
import { StudentDetailInfoDto } from 'src/students/dto/student-detail-info.dto';

@ApiTags('Студент')
@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @ApiOperation({ summary: 'Список всех студентов' })
  @ApiResponse({ status: 200, type: AuthStudentDto })
  @Get('list')
  public getStudentsList(): Promise<StudentCommonInfoDto[]> {
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
  @Get('student/:id')
  public getStudentInfo(@Param() params): Promise<StudentDetailInfoDto> {
    return this.studentsService.getStudentInfo(params.id);
  }
}
