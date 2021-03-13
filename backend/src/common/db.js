const Sequelize = require('sequelize');
const path = require('path');
const config = require("../../config/config.json")['database'];

const db = new Sequelize({
    username: config.username,
    database: config.database,
    password: config.password,
    host: config.host,
    dialect: config.dialect,
    pool: config.pool
});

db.authenticate()
.then(()=>{
    console.log("Database connection established successfully.");
}).catch(err => {
    console.log("Unable to connect to database",err);
});

module.exports = db;