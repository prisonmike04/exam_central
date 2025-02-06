import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';

class SubjectModel extends Model {}

SubjectModel.init(
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
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        caMarks: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        eseMarks: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        credits: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Subject',
        tableName: 'subjects',
    }
);

export default SubjectModel;
