const { DataTypes } = require('sequelize');
const Status = require('./status');
const Role = require('./role');
const Unite = require('./unite');
const db = require('../startup/connection_db');


const compte = db.define("creation_compte", {
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
    id_beneficiaire: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    firstname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lastname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    role: {
        type: Role,
        allowNull: false
    },
    unite: {
        type: Unite,
        allowNull: false
    },
    forme_par: {
        type: DataTypes.INTEGER,
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
    }
}, {
    freezeTableName: true,
    modelName: 'creation_compte',
    timestamps: false
});

compte.belongsTo(Role, { foreignKey: 'role' });
compte.belongsTo(Unite, { foreignKey: 'unite' });
compte.belongsTo(Status, { foreignKey: 'status' });

module.exports = compte;