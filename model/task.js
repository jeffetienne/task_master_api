const { DataTypes } = require('sequelize');
const Status = require('./status');
const db = require('../startup/connection_db');
const Objet = require('./objet');
const Priority = require('./priority');

const tache = db.define("tache", {
    Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    objet: {
        type: Objet,
        allowNull: false
    },
    demande: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    assign_to: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    assign_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    },
    priority: {
        type: Priority,
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
    modelName: 'tache',
    timestamps: false
});

tache.belongsTo(Objet, { foreignKey: 'objet' });
tache.belongsTo(Priority, { foreignKey: 'priority' });
tache.belongsTo(Status, { foreignKey: 'status' });

module.exports = tache;