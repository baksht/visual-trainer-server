import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { LevelResults } from 'src/trainings/models/level-results.model';

interface StepResultsCreationAttributes {
  isRight: boolean;
  stepTime: number;
  imageSwitchesNumber: number;
  levelResultsId: number;
}

@Table({ tableName: 'steps_results' })
export class StepResults extends Model<StepResults, StepResultsCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public readonly id: number;

  @Column({ type: DataType.BOOLEAN })
  public readonly isRight: boolean;

  @Column({ type: DataType.INTEGER })
  public readonly stepTime: number;

  @Column({ type: DataType.INTEGER })
  public readonly imageSwitchesNumber: number;

  @ForeignKey(() => LevelResults)
  @Column({ type: DataType.INTEGER })
  public readonly levelResultsId: number;

  @BelongsTo(() => LevelResults)
  public readonly levelResults: LevelResults;
}
