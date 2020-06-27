const { DataTypes } = require('sequelize');

const db = require('../startup/connection_db');

const Role = db.define("Role", {
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
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
