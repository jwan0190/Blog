//Layer3, router logic only 

const signIn = require('../controller/user')
const {SuccessModel,ErrorModel} = require('../model/resModel') 

const handleUserRouter = (req,res)=>{
    const method = req.method 
    const data = req.body
    const path = req.url
   
    // sign in 
    if (method === 'POST' && path ==='/api/user/signin'){
        const {username,psw} = data 
        console.log('u',username)
        console.log('p',psw)
        const result = signIn(username,psw)//return a promise
       
        return result.then(data=>{
            if(data.username){
                
                return new SuccessModel(data.username,username + ' is logged in')
            }
            return new ErrorModel('login failed')
        })
       
        
    }

    
}

module.exports = handleUserRouter