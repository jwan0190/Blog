const { exec } = require("../db/mysql")

//Layer4.process of data 
const getList = (author,keyword) =>{
    let sql = `select * from blog where 1=1`
    if(author){
        sql += ` and author like '%${author}%'`
    }
    if(keyword){
        sql +=` and content like '%${keyword}%'`
    }
    sql += ` order by createtime desc;` 
    //return a promise
    return exec(sql) 
}

const getDetail = (id) =>{ 
    const sql = `select * from blog where id=${id}`
    return exec(sql)
} 

const newBlog = (blogData={})=>{
    //blogData is an object that include title, content property
    const title = blogData.title
    const content = blogData.content
    const createtime = Date.now()
    const author = blogData.author
    console.log("author",blogData)
    const sql = `insert into blog(title,content,createtime,author)values('${title}','${content}','${createtime}','${author}')`
    return exec(sql).then(dt=>{
        return {id:dt.insertId}
    })
}

const updateBlog = (id, blogData={})=>{
    const  sql =  `update blog set title='${blogData.title}',content ='${blogData.content}' where id = ${id}`
    return exec(sql).then(dt=>{
        if(dt.affectedRows>0){
            
            return true
        }
        
        return false
        
       })
}

const deleteBlog = (id,author)=>{
    const sql =    `delete from blog where id = ${id} and author = '${author}'`
    
    return exec(sql).then(dt=>{
        if(dt.affectedRows>0){console.log("delete","deleted")
        return true}
        return false
    })
}

 

module.exports = {getList,getDetail,newBlog,updateBlog,deleteBlog}