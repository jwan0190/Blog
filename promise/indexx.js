const fs = require('fs')
const path = require('path')


/*
//callback get file content

function getFileContent(filename,callback){
    const fullFileName = path.resolve(__dirname,'files',filename)
    fs.readFile(fullFileName,(err,data)=>{
        if(err){
            console.error(err)
            return
        }
        callback(data.toString())
    })
}
//callback hell 

getFileContent('a.json',aData=>{
    console.log('aData',aData)
    getFileContent(aData.next,bData=>{
        getFileContent(bData.next,cData=>{
            console.log('cData',cData)
        })
    })
})*/

//1. promise 链式访问文件内容
function getFileContent(filename){
    const promise = new Promise((resolve, reject)=>{
        const fullFileName = path.resolve(__dirname,'file',filename)
        fs.readFile(fullFileName,(err,data)=>{
            if(err){
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

//get c.json content by chain addressing using promise.then()
getFileContent('a.json').then(aData=>{
    return getFileContent(aData.next)
}).then(bData=>{return getFileContent(bData.next )}).then(cData=>{console.log(cData)
    return cData})

//2. async await (koa2)
