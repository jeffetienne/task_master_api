const { DataTypes } = require('sequelize');

const db = require('../startup/connection_db');

const Role = db.define("Role", {
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
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cree_par: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cree_le: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true,
    modelName: 'role',
    timestamps: false
});
module.exports = Role;
