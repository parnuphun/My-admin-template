const mysql = require('mysql2')

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

conn.getConnection((err)=>{
    if(err) {
        return console.error('Error to connect database !')
    }else{
        return console.log('db connected!')
    }
})

module.exports = conn;