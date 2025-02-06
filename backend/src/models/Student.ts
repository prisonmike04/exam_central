import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';

// Define the Student class with typed properties
export class Student extends Model {
  public id!: number;
  public name!: string;
  public branch!: string;
  public semester!: number;
  public special_accommodations!: boolean;
  public email!: string;
  public password!: string;
}

// Initialize the Student model
Student.init(
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
    branch: {
      type: DataTypes.STRING(255),  // String with a max length of 255 characters
      allowNull: false,
    },
    semester: {
      type: DataTypes.INTEGER,  // Integer for semester
      allowNull: false,
    },
    special_accommodations: {
      type: DataTypes.BOOLEAN,  // Boolean for special accommodations
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING(255),  // Email string with a max length of 255 characters
      unique: true,                 // Unique constraint on email
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),  // Password string with a max length of 255 characters
      allowNull: false,
    },
  },
  {
    sequelize,              // Database connection
    modelName: 'Student',    // Model name
    tableName: 'students',   // Table name in the database (lowercase)
    timestamps: false,       // Disable timestamps
  }
);

export default Student;
