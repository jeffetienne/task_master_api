const { DataTypes } = require('sequelize');

const db = require('../startup/connection_db');

const Unite = db.define("Unite", {
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
    responsable: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    extension: {
        type: DataTypes.INTEGER,
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
    modelName: 'unite',
    timestamps: false
});
module.exports = Unite;
