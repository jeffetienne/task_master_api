import { DataTypes } from "sequelize/types";

const { Sequelize, Model } = require('sequelize');
const sequelize = new Sequelize('mssql');
import { Role } from './role';
import { Unite } from './unite';
import { Status } from "./status";

export class Compte extends Model {
    beneficiaire: {
        type: DataTypes.IntegerDataType,
        allowNull: false
    };
    username: {
        type: DataTypes.StringDataType,
        allowNull: false
    };
    firstname: {
        type: DataTypes.StringDataType,
        allowNull
    };
    lastname: {
        type: DataTypes.StringDataType,
        allowNull
    };
    role: {
        type: Role,
        allowNull
    };
    unite: {
        type: Unite,
        allowNull: false
    };
    forme_par: {
        type: DataTypes.StringDataType,
        allowNull: false
    };
    status: {
        type: Status
        allowNull: false
    };
    status_date: {
        type: DataTypes.DateDataType,
        allowNull: false
    };
    status_by: {
        type: DataTypes.IntegerDataType,
        allowNull: false
    };
    status_reason: {
        type: DataTypes.StringDataType,
        allowNull: true
    };
    cree_par: {
        type: DataTypes.StringDataType,
        allowNull: false
    };
    cree_le: {
        type: DataTypes.StringDataType,
        allowNull: false
    };
    modifie_par: {
        type: DataTypes.StringDataType,
        allowNull: true
    };
    modifie_le: {
        type: DataTypes.DateDataType,
        allowNull: true
    }
}