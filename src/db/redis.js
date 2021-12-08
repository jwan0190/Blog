const redis = require('redis')
const {REDIS_CONF} =require('../conf')

//create client server (port,host)
const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error',err =>{
    console.error(err)
})

function set(k,v){
    if(typeof v ==='object'){
        v = JSON.stringify(v)
        redisClient.set(k,v,redis.print)
    }
}
function get(k){
    const promise = new Promise((resolve,reject)=>{
        redisClient.get(k,(err,v)=>{
            if(err){
                reject(err)
            }
            if(v==null){
                resolve(null)
                return
            }
//make JSON compatible 

            try {
                resolve(JSON.parse(v))
            } catch (ex) {
                resolve(v)
            }
         
            //quit redis 
            redisClient.quit()
        })
        
})
return promise
}

module.exports={get,set}

