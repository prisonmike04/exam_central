import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';

class Admin extends Model {
  public id!: number;
  public name!: string; // Added name field
  public email!: string;
  public password!: string;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Ensure the name field is required
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
    tableName: 'admin',
    timestamps: false,
  }
);

export default Admin;
