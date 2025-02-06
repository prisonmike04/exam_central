import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

interface MarksAttributes {
  id: number;
  sap_id: string;
  programme: string;
  course_code: string;
  course_name: string;
  highest_marks: number;
  course_credits: number;
  ca_tw_max_marks: number;
  ca_tw_marks_obtained: number;
  ese_pr_orl_max_marks: number;
  ese_pr_orl_marks_obtained: number;
  final_max_marks: number;
  marks_obtained: number;
  final_grade: string;
  credits_earned: number;
  grade_points: number;
  total_points: number;
  sgpa: number;
  remark: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// If id is auto-increment, you might make it optional in creation
type MarksCreationAttributes = Optional<MarksAttributes, 'id'>;

class MarksModel
  extends Model<MarksAttributes, MarksCreationAttributes>
  implements MarksAttributes
{
  public id!: number;
  public sap_id!: string;
  public programme!: string;
  public course_code!: string;
  public course_name!: string;
  public highest_marks!: number;
  public course_credits!: number;
  public ca_tw_max_marks!: number;
  public ca_tw_marks_obtained!: number;
  public ese_pr_orl_max_marks!: number;
  public ese_pr_orl_marks_obtained!: number;
  public final_max_marks!: number;
  public marks_obtained!: number;
  public final_grade!: string;
  public credits_earned!: number;
  public grade_points!: number;
  public total_points!: number;
  public sgpa!: number;
  public remark!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MarksModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    sap_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    programme: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    course_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    highest_marks: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    course_credits: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ca_tw_max_marks: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ca_tw_marks_obtained: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ese_pr_orl_max_marks: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ese_pr_orl_marks_obtained: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    final_max_marks: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    marks_obtained: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    final_grade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    credits_earned: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    grade_points: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_points: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sgpa: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'marks',
  }
);

export default MarksModel;
