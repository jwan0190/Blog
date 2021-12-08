const { exec } = require("../db/mysql")

const signIn = (username, psw)=>{
    const sql = `select * from user where username = '${username}' and psw = '${psw}' `
    return exec(sql).then(data=>{
        return data[0] || {}
    })
}
module.exports = signIn