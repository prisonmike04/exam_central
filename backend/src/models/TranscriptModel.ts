import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';
import SubjectModel from './SubjectModel';

class TranscriptModel extends Model {}

TranscriptModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sapId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        teacherId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gpa: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Transcript',
        tableName: 'transcripts',
    }
);

TranscriptModel.hasMany(SubjectModel, { foreignKey: 'transcript_id', onDelete: 'CASCADE' });
SubjectModel.belongsTo(TranscriptModel, { foreignKey: 'transcript_id' });

export default TranscriptModel;
