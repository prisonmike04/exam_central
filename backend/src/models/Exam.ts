// backend/src/models/Exam.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';

export class Exam extends Model {
  public id!: number;
  public name!: string;
  public subject!: string;
  public date!: Date;
}

Exam.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'exams',
    sequelize,
    timestamps: false,
  }
);
