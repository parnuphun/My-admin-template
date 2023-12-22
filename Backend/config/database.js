const mysql = require('mysql2')
require('dotenv').config()

// const conn = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//     multipleStatements: true,
// })

const conn = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'namphong_school',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
})

conn.getConnection((err) => {
    if (err) {
        console.log(err);
        return console.error('Error to connect database !')
    } else {
        return console.log('db connected!')
    }
})

module.exports = conn;