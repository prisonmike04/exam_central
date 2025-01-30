"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../utils/database"));
class Supervisor extends sequelize_1.Model {
}
Supervisor.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    availability_start: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    availability_end: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    specialization: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
}, {
    sequelize: database_1.default,
    modelName: "Supervisor",
    tableName: "supervisors",
    timestamps: false,
});
exports.default = Supervisor;
