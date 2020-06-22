import { DataTypes } from "sequelize/types";

const { Sequelize, Model } = require('sequelize');
const sequelize = new Sequelize('mssql');

export class Status extends Model {
    Id: {
        type: DataTypes.IntegerDataType,
        allowNull: false
    };
    name: {
        type: DataTypes.StringDataType,
        allowNull: false
    };
}
