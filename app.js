//Layer2: router, decode query, process request setting 
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')
const { ErrorModel } = require('./src/model/resModel')
const {get,set} = require('./src/redis')
const SESSION_DATA ={}
const serverHandle = (req,res) =>{
    // setup response type : JSON
    res.setHeader('Content-type','application/json')
    
    //obtain path 
    const url = req.url

    //define the function that decode query 
    req.query = querystring.parse(url.split('?')[1])

    //resolve cookie
    req.cookie={}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item=>{
        if(!item){
            return 
        }
        const key = item.split('=')[0]
        const value = item.split('=')[1]
        req.cookie[key]=value
    })

    //resolve session 
    const getCookieExpire =()=>{
        const d = new Date()
        d.setTime(d.getTime()+(24*60*60*1000))
        return d.toGMTString()
    }
    let needSetCookie = false
    let uid = req.cookie.uid
    if(uid){
        if(!SESSION_DATA[uid]){
            SESSION_DATA[uid]={}
        }
    }else{
        needSetCookie = true
        uid = `${Date.now()}_${Math.random()}`
        SESSION_DATA[uid] = {}
    }
    req.session = SESSION_DATA[uid]
  
    //define the function that process post data 
    const getPostData = (req)=>{
        const promise = new Promise((resolve,reject)=>{
            if(req.method !=='POST'){
                resolve({})
                return 
            } 
            if (req.headers['content-type'] != 'application/json'){
                resolve({})
                return 
            }
            //resolve post data streaming
            let postData =""
            req.on('data',chunk=>{
                postData += chunk.toString()
            })
            
            req.on('end',()=>{
                if(!postData){
                    resolve({})
                    return 
                }
                resolve(JSON.parse(postData))
            })
        })
        
        return promise 
    }

    getPostData(req).then(postData=>{
        //set req body to be the post data
        req.body =postData
        //process user router & blog router
        const userResult = handleUserRouter(req,res)
        const blogResult = handleBlogRouter(req,res)//handleBlog Router return a promise
        if(blogResult){
            blogResult.then(blogData=>{
                    console.log('------------------------------BlogResult---------')
                    if(needSetCookie){
                        //set cookie on response header
                        res.setHeader('Set-Cookie',`uid=${uid};path=/;httpOnly;expires=${getCookieExpire()}`)
                    }
                    res.end(JSON.stringify(blogData))
                })
            return 
        }
        // Blog Router 
        //User Router
        if(userResult){
            userResult.then(userData=>{
                console.log('------------------------------UserResult---------')
                if(needSetCookie){
                    //set cookie on response header
                    res.setHeader('Set-Cookie',`uid=${uid};path=/;httpOnly;expires=${getCookieExpire()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }
         
        
        //undefined Router, return 404
        else{res.writeHead(404,{'Content-type':'text/plain'})
        res.write("404 NOT FOUND \n")
        res.end}   

    })

    
}
module.exports = serverHandle