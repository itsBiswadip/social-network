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
        unique: true
    },
    password : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt : {
        type: DataTypes.DATE,
        defaultValue: db.literal('CURRENT_TIMESTAMP')
    },
    updatedAt : {
        type: DataTypes.DATE,
        defaultValue: db.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    },
},{
    timestamps: true,  // add the timestamp attributes (createdAt, updatedAt)
    freezeTableName: true, //dont change table names
});

module.exports = UserSchema;