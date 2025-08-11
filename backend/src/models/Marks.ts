import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';

export class Marks extends Model {
  public id!: number;
  public studentId!: number;
  public examId!: number;
  public subjectCode!: string;
  public subjectName!: string;
  public caMarks!: number;
  public eseMarks!: number;
  public finalMarks!: number;
  public grade!: string;
  public gradePoint!: number;
}

Marks.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  examId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  subjectCode: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  subjectName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  caMarks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eseMarks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  finalMarks: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grade: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  gradePoint: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'marks',
  timestamps: false,
});
