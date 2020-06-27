const { DataTypes } = require('sequelize');

const db = require('../startup/connection_db');

const Status = db.define("Status", {
  code:{
    type: DataTypes.TEXT,
    allowNull: false,
    primaryKey: true
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
