import { Column, Model, Table, DataType } from 'sequelize-typescript';

interface TrainerCreationAttributes {
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  password: string;
}

@Table({ tableName: 'trainers' })
export class Trainer extends Model<Trainer, TrainerCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public readonly id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  public readonly email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public readonly name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public readonly surname: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public readonly patronymic: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public readonly password: string;
}
