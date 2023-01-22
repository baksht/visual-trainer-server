import LevelResults from 'src/trainings/models/level-results.model';
import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';

interface StudentCreationAttributes {
  name: string;
  surname: string;
  isTrainingFinished: boolean;
}

@Table({ tableName: 'students' })
class Student extends Model<Student, StudentCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isTrainingFinished: boolean;

  @HasMany(() => LevelResults)
  levelsResults: LevelResults[];
}

export default Student;
