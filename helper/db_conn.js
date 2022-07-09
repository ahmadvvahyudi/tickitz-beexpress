const mysql = require('mysql');
require ('dotenv').config();
const {HOST, USER, PASSWORD, DATABASE} = process.env;
const db =mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
})
db.connect((err)=>{
    if(err){
        console.log(err)}
        console.log('DATABASE CONNECTED')}
    )
module.exports = db;
