const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../common/db');

const UserSchema = db.define('User',{
    userID: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true    
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""
    },
    email: {
        type: DataTypes.STRING(320),
        allowNull: false,
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{
    timestamps: true,  // add the timestamp attributes (createdAt, updatedAt)
    freezeTableName: true, //dont change table names
});

module.exports = UserSchema;