const fs = require("fs")
const path = require("path")
const url = require("url")
const mime = require('mime')
const http = require("http")
const fileShow = require("./fileShow")

const server = http.createServer((request,respond)=>{
    const urlString = request.url
    let filePathName = path.join(__dirname,'./public',urlString)  //文件路径

    let ext = path.parse(filePathName).ext  //扩展名
    let mimeType = mime.getType(ext)  //根据扩展名拿到文件类型 ,得去掉 .
    console.log(urlString)

    fileShow(filePathName,ext).then(data => {
        if (!data) {
            respond.writeHead(404)
            respond.end("404 not found")
        
        } else {
            respond.writeHead(200, {
                "Content-Type": mimeType,
          })
            respond.end(data)
        
        }
      })
})

server.listen(3000,function () {
    console.log("3000端口已经启用~")
})
