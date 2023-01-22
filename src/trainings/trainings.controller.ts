import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import TrainingsService from 'src/trainings/trainings.service';
import LevelResultsDto from 'src/trainings/dto/level-results.dto';
import JwtAuthGuard from 'src/students/guards/jwt-auth.guard';
import LevelInfoDto from 'src/trainings/dto/level-info.dto';
import TrainingStatusDto from './dto/training-status.dto';

@ApiTags('Тестирование')
@Controller('training')
class TrainingsController {
  constructor(private trainingsService: TrainingsService) {}

  @ApiOperation({ summary: 'Получить информацию по уровню' })
  @ApiResponse({ status: 200, type: LevelInfoDto })
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'number',
    required: true,
    description: 'Номер уровня',
    type: 'integer',
    example: 1,
  })
  @Get('level/:number')
  getLevel(@Param() params): Promise<LevelInfoDto> {
    return this.trainingsService.getLevel(params.number);
  }

  @ApiOperation({ summary: 'Закончить уровень' })
  @ApiResponse({ status: 201, type: TrainingStatusDto })
  @UseGuards(JwtAuthGuard)
  @Post('levelComplete')
  completeLevel(
    @Body() levelResultsDto: LevelResultsDto,
    @Request() req,
  ): Promise<TrainingStatusDto> {
    return this.trainingsService.levelComplete(
      req.user.studentId,
      levelResultsDto,
    );
  }

  @ApiOperation({ summary: 'Получить статус тренинга' })
  @ApiResponse({ status: 200, type: TrainingStatusDto })
  @UseGuards(JwtAuthGuard)
  @Get('status')
  getStatus(@Request() req): Promise<TrainingStatusDto> {
    return this.trainingsService.getTrainingStatus(req.user.studentId);
  }
}

export default TrainingsController;
