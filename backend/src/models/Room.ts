import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';

// Define Room class with typed properties
export class Room extends Model {
  public id!: number;
  public name!: string;
  public capacity!: number;
}

// Initialize the Room model
Room.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,  // Unsigned integer for id
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),  // String with a max length of 255 characters
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER.UNSIGNED,  // Unsigned integer for capacity
      allowNull: false,
      defaultValue: 25,  // Default capacity set to 25
    },
  },
  {
    sequelize,              // Database connection
    modelName: 'Room',       // Model name
    tableName: 'rooms',      // Table name in the database
    timestamps: false,       // Disable timestamps
  }
);

export default Room;
