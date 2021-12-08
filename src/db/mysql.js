const mysql = require('mysql')
const {MYSQL_CONF} = require('../conf/dbconfig')

//create connection to MySQL, and specify the database
const con = mysql.createConnection(MYSQL_CONF)
console.log(MYSQL_CONF)
// start connection 
con.connect(function(err){
    if(err)throw err

})

//execute sql clauses 
function exec(sql){
    const promise = new Promise((resolve,reject)=>{
        con.query(sql,(err,result)=>{
            if(err){
                reject(err)
            }
            resolve(result);
        })
    })
    return promise 
} 

module.exports = {exec}


