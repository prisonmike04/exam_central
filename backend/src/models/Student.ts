import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';

export class Student extends Model {
  public id!: number;
  public name!: string;
  public branch!: string;
  public semester!: number;
  public special_accommodations!: boolean;
  public email!: string;
  public password!: string;
}

Student.init(
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
    branch: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    special_accommodations: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
  },
  {
    sequelize,
    tableName: 'students',
    timestamps: false,
  }
);