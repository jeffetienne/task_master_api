const { DataTypes } = require('sequelize');
const Status = require('./status');
const Role = require('./role');
const Unite = require('./unite');
const db = require('../startup/connection_db');


const log_modification = db.define("log_modification", {
    Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    table_modifiee: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    champ_modifie: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ligne_modifiee: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ancienne_valeur: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nouvelle_valeur: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    modifie_par: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    modifie_le: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    freezeTableName: true,
    modelName: 'log_modification',
    timestamps: false
});

module.exports = log_modification;