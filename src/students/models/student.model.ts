import { LevelResults } from 'src/trainings/models/level-results.model';
import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';

interface StudentCreationAttributes {
  name: string;
  surname: string;
  isTrainingFinished: boolean;
}

@Table({ tableName: 'students' })
export class Student extends Model<Student, StudentCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public readonly id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public readonly name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public readonly surname: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  public readonly isTrainingFinished: boolean;

  @HasMany(() => LevelResults)
  public readonly levelsResults: LevelResults[];
}
