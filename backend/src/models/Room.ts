import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';

class Room extends Model {}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Room',
    tableName: 'Rooms',
    timestamps: false, // Disable timestamps
  }
);

export default Room;
