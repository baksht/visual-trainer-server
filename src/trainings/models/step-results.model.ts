import Student from 'src/students/models/student.model';
import {
  Column,
  Model,
  Table,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import LevelResults from 'src/trainings/models/level-results.model';

interface StepResultsCreationAttributes {
  isRight: boolean;
  stepTime: number;
  imageSwitchesNumber: number;
  levelResultsId: number;
}

@Table({ tableName: 'steps_results' })
class StepResults extends Model<StepResults, StepResultsCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.BOOLEAN })
  isRight: boolean;

  @Column({ type: DataType.INTEGER })
  stepTime: number;

  @Column({ type: DataType.INTEGER })
  imageSwitchesNumber: number;

  @ForeignKey(() => LevelResults)
  @Column({ type: DataType.INTEGER })
  levelResultsId: number;

  @BelongsTo(() => LevelResults)
  levelResults: LevelResults;
}

export default StepResults;
