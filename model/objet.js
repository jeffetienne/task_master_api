const { DataTypes } = require('sequelize');

const db = require('../startup/connection_db');

const Objet = db.define("type_demande", {
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
    },
    modifie_par: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    modifie_le: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true,
    modelName: 'Objet',
    timestamps: false
});

module.exports = Objet;
