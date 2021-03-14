const db = require('../../common/db');
const { QueryTypes } = require('sequelize');
const UserSchema = require('./userSchema');

const userModel = {};

userModel.createUser = async(email, password, userName = '') => {
    let query = `INSERT 
            INTO User (email, password, userName) 
            VALUES (?, ?, ?)`;
    let [newUser] = await db.query(query, {
        raw: true,
        type: QueryTypes.INSERT,
        replacements: [email, password, userName]
    })

    return newUser;
}

userModel.findUserByUserId = async(userId, attributes=['*']) => {
    let query = `SELECT ${attributes.join()} FROM User WHERE userID = ?`;
    let [user] = await db.query(query, {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: [userId]
    })

    return user;
}

userModel.findUserByEmail = async(email, attributes=['*']) => {
    let query = `SELECT ${attributes.join()} FROM User WHERE email = ?`;
    let [user] = await db.query(query, {
        raw: true,
        type: QueryTypes.SELECT,
        replacements: [email]
    })

    return user;
}

module.exports = userModel;