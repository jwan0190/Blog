//Layer1 : server setting 
const http = require('http')
const serverHandle = require('../app')
const PORT = 8080
const server = http.createServer(serverHandle)
// const server = http.createServer((req,res)=>{
//     res.end('hellow')
// })
server.listen(PORT)
