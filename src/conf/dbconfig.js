const env = process.env.NODE_ENV //environment 
 console.log(env)
//configuration 
let MYSQL_CONF 
//development mode configuration 
if (env ==='dev'){
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'Lv&pis2021',
        port:'3306',
        database:'myblog'
    }
}

//production mode configuration 
if (env ==='prd'){
    MYSQL_CONF = {
        //host:'localhost',
        user:'root',
        password:'Lv&pis2021',
        port:'3306',
        database:'myblog'
    }
}
else{
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'Lv&pis2021',
        port:'3306',
        database:'myblog'
    }
}

//redis config
let REDIS_CONF={
    port:6379,
    host:'127.0.0.1'
}

module.exports = {MYSQL_CONF,REDIS_CONF}