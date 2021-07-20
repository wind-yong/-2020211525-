const path = require('path')
const express = require("express")
//引入
var multer  = require('multer')
var tool = require('./tool')

const app = express()

app.use(express.static("./pubilc"))

app.post("/upload",tool.array("file",2),(req,res)=>{
    res.send("上传成功！！")
})

app.listen(3000,function(){
    console.log("3000端口已经启动~")
})