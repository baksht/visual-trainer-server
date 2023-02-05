import { Student } from 'src/students/models/student.model';
import { Column, Model, Table, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { StepResults } from 'src/trainings/models/step-results.model';

interface LevelResultsCreationAttributes {
  numberOfLevel: number;
  studentId: number;
  referenceViewingTime: number;
}

@Table({ tableName: 'levels_results' })
export class LevelResults extends Model<LevelResults, LevelResultsCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public readonly id: number;

  @Column({ type: DataType.INTEGER, validate: { min: 1, max: 10 } })
  public readonly numberOfLevel: number;

  @Column({ type: DataType.INTEGER })
  public readonly referenceViewingTime: number;

  @ForeignKey(() => Student)
  @Column({ type: DataType.INTEGER })
  public readonly studentId: number;

  @BelongsTo(() => Student)
  public readonly student: Student;

  @HasMany(() => StepResults)
  public readonly stepsResults: StepResults[];
}
