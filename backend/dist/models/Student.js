"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
class Student extends sequelize_1.Model {
}
Student.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    branch: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    special_accommodations: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Student',
    tableName: 'Students',
    timestamps: false, // Disable timestamps
});
exports.default = Student;
