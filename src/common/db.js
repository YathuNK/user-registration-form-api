"use strict";
const mysql = require("serverless-mysql")();
const config = require("./config");

// mysql connection
try{
    mysql.config({
        host: config.database.host,
        database: config.database.database,
        user: config.database.user,
        password: config.database.password,
    });
    mysql.connect();
}catch(e){
    console.log("error in connecting database",e)
}

module.exports = mysql;
