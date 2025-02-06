'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const basename = path.basename(__filename);

// Load environment variables from .env file
dotenv.config();

const db = {};

// Initialize Sequelize using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Adjust if using a different database (e.g., 'postgres', 'sqlite')
    logging: false, // Optional: Disable SQL query logging
  }
);

// Dynamically load all models in the directory
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Establish model associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
