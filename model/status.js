const { DataTypes } = require('sequelize');

const db = require('../startup/connection_db');

const Status = db.define("Status", {
  Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    uniqueKey: true
  }

}, {
  freezeTableName: true,
  modelName: 'status',
  timestamps: false
});
module.exports = Status;
