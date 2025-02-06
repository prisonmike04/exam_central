// backend/src/models/TeacherAvailability.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/database';
import { Teacher } from './Teacher';

export class TeacherAvailability extends Model {
  public id!: number;
  public teacherId!: number;
  public availabilityStart!: Date;
  public availabilityEnd!: Date;

  // Define the Teacher relationship (for TypeScript typings)
  public Teacher?: Teacher;
}

TeacherAvailability.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    teacherId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    availabilityStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    availabilityEnd: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'teacher_availability',
    timestamps: false,
  }
);

// Define the association with the Teacher model
TeacherAvailability.belongsTo(Teacher, { as: 'Teacher', foreignKey: 'teacherId' });

