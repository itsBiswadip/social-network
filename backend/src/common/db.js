const Sequelize = require('sequelize');
const path = require('path');
const config = require("../../config/config.json")['database'];

const db = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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