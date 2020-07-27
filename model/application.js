const { DataTypes } = require('sequelize');

const db = require('../startup/connection_db');

const Application = db.define("application", {
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
    modelName: 'Application',
    timestamps: false
});

module.exports = Application;
