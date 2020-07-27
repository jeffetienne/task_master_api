const { DataTypes } = require('sequelize');

const db = require('../startup/connection_db');

const TypeDonnee = db.define("type_donnee", {
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
    modelName: 'TypeDonnee',
    timestamps: false
});

module.exports = TypeDonnee;
