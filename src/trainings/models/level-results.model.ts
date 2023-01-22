import Student from 'src/students/models/student.model';
import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import StepResults from 'src/trainings/models/step-results.model';

interface LevelResultsCreationAttributes {
  numberOfLevel: number;
  studentId: number;
  referenceViewingTime: number;
}

@Table({ tableName: 'levels_results' })
class LevelResults extends Model<LevelResults, LevelResultsCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.INTEGER, validate: { min: 1, max: 10 } })
  numberOfLevel: number;

  @Column({ type: DataType.INTEGER })
  referenceViewingTime: number;

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

  @HasMany(() => StepResults)
  stepsResults: StepResults[];
}

export default LevelResults;
