const { DataTypes } = require('sequelize');

const db = require('../startup/connection_db');

const Priority = db.define("Priority", {
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    modelName: 'priority',
    timestamps: false
});

module.exports = Priority;
