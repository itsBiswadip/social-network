const { Sequelize, DataTypes } = require('sequelize');
const db = require('../../common/db');
const UserSchema = require('../User/userSchema');

const PostSchema = db.define('Post',{
    postID: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true    
    },
    authorID: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
            model: UserSchema,
            key: 'userID'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    likes : {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
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

module.exports = PostSchema;