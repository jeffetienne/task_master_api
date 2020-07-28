const { DataTypes } = require('sequelize');
const Status = require('./status');
const Role = require('./role');
const Unite = require('./unite');
const db = require('../startup/connection_db');
const Application = require('./application');


const AjoutModule = db.define("ajout_module", {
    Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    demandeur: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_demande: {
        type: DataTypes.DATE,
        allowNull: false
    },
    application: {
        type: Application,
        allowNull: false
    },
    sommaire: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: Status,
        allowNull: false
    },
    status_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status_reason: {
        type: DataTypes.TEXT,
        allowNull: true
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
        allowNull: true
    },
    modifie_le: {
        type: DataTypes.DATE,
        allowNull: true
    },
    supprime: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    supprime_par: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    supprime_le: {
        type: DataTypes.DATE,
        allowNull: true
    },
    supprime_raison: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true,
    modelName: 'AjoutModule',
    timestamps: false
});

AjoutModule.belongsTo(Application, { foreignKey: 'application' });
AjoutModule.belongsTo(Status, { foreignKey: 'status' });

module.exports = AjoutModule;