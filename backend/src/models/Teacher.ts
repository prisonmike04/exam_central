import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';

export class Teacher extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public branch!: string;
}

Teacher.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'teachers',
    timestamps: false,
  }
);
