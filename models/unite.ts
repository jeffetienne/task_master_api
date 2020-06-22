import { DataTypes } from "sequelize/types";

const { Sequelize, Model } = require('sequelize');
const sequelize = new Sequelize('mssql');

export class Unite extends Model {
    Id: {
        type: DataTypes.IntegerDataType,
        allowNull: false
    };
    name: {
        type: DataTypes.StringDataType,
        allowNull: false
    };
    responsable: {
        type: DataTypes.StringDataType,
        allowNull: false
    };
    extension: {
        type: DataTypes.IntegerDataType,
        allowNull: false
    }
    cree_par: {
        type: DataTypes.StringDataType,
        allowNull
    };
    cree_le: {
        type: DataTypes.StringDataType,
        allowNull
    }
}