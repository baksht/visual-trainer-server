import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import StudentsModule from 'src/students/students.module';
import Student from 'src/students/models/student.model';
import TrainingsModule from 'src/trainings/trainings.module';
import LevelResults from 'src/trainings/models/level-results.model';
import { resolve } from 'path';
import StepResults from 'src/trainings/models/step-results.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: Number(process.env.POSTGRES_PORT),
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Student, LevelResults, StepResults],
      autoLoadModels: true,
    }),
    StudentsModule,
    TrainingsModule,
  ],
})
class AppModule {}

export default AppModule;
