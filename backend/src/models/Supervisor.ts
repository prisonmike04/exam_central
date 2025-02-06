import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/database";

interface SupervisorAttributes {
  id: number;
  name: string;
  availability_start: Date;
  availability_end: Date;
  specialization: string;
  email: string;
}

// Make 'id' optional for creation
interface SupervisorCreationAttributes extends Optional<SupervisorAttributes, 'id'> {}

class Supervisor extends Model<SupervisorAttributes, SupervisorCreationAttributes> implements SupervisorAttributes {
  public id!: number;
  public name!: string;
  public availability_start!: Date;
  public availability_end!: Date;
  public specialization!: string;
  public email!: string;
}

Supervisor.init(
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
    availability_start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    availability_end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Supervisor",
    tableName: "supervisors",
    timestamps: false,
  }
);

export default Supervisor;
