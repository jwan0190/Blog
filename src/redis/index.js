const redis = require('redis')

//create client server (port,host)
const redisClient = redis.createClient(6379,'127.0.0.1')
redisClient.on('error',err =>{
    console.error(err)
})

redisClient.set('name','zhangsan',redis.print)
redisClient.get('name',(err,val)=>{
    if(err){
        console.error(err)
    }
    console.log('val',val)
    //quit redis 
    redisClient.quit()
})