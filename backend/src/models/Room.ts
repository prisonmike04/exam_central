// backend/src/models/Room.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';

export class Room extends Model {
  public id!: number;
  public name!: string;
  public capacity!: number;
}

Room.init(
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
    capacity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 25,
    },
  },
  {
    tableName: 'rooms',
    sequelize,
    timestamps: false,
  }
);
