const { DataTypes } = require('sequelize');

const db = require('../startup/connection_db');
const Application = require('./application');

const Module = db.define("module", {
    application: {
        type: Application,
        allowNull: false
    },
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
    modelName: 'Module',
    timestamps: false
});

Module.belongsTo(Application, { foreignKey: 'application' });

module.exports = Module;
