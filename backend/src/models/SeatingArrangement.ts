// backend/src/models/SeatingArrangement.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';
import { Exam } from './Exam';
import { Student } from './Student';
import { Teacher } from './Teacher';
import { Room } from './Room';

export class SeatingArrangement extends Model {
  public id!: number;
  public examId!: number;
  public studentId!: number;
  public teacherId!: number;
  public roomId!: number;
  public seatNumber!: number;

  public readonly Student?: Student;
  public readonly Teacher?: Teacher;
  public readonly Room?: Room;
  public readonly Exam?: Exam;
}

SeatingArrangement.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    examId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    seatNumber: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'seating_arrangements',
    timestamps: false,
  }
);
