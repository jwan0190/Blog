////Layer3, router logic only 

const {getList, getDetail,newBlog,updateBlog,deleteBlog} = require('../controller/blog')
const {SuccessModel,ErrorModel} = require('../model/resModel') 
const handleBlogRouter = (req,res)=>{
    const method = req.method 
    const url = req.url
    const path = url.split('?')[0]
    const data = req.body
    const id = req.query.id 

    //get blog list 
    if (method === 'GET' && path ==='/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result  = getList(author,keyword)//getList returns a promise

        return result.then(listData=>{
            return new SuccessModel(listData)
        })        // return a promise with information of errno & msg
    
    }  

    //get blog details 
    if (method === 'GET' && path ==='/api/blog/detail'){
        const result = getDetail(id)//return a promise 
        if(result){
            //return a promise & the promise callback return the success model
            return result.then(data=>{
                return new SuccessModel(data)
            })
            
        }
    }

    //new a blog 
    if (method === 'POST' && path ==='/api/blog/new'){
        req.body.author = 'zhangsan'

        const result = newBlog(data)
        if(result){
            return result.then(data=>{
                return new SuccessModel(data)
            })
        }
    }

    //update
    if (method === 'POST' && path ==='/api/blog/update'){
        const result = updateBlog(id,req.body)
        if(result){
            return result.then(data=>{return new SuccessModel(data)}
            )
            
        }else{return new ErrorModel('update failed')}
    }

    //delete
    if (method === 'POST' && path ==='/api/blog/delete'){
        const result = deleteBlog(id,req.body.author)
        if(result){
            return result.then(data=>{return new SuccessModel(data)}
            )
            
        }else{return new ErrorModel('update failed')}
    }
}

module.exports = handleBlogRouter