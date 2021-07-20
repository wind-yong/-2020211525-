const http = require("http")
const fs = require("fs")
const path = require("path")

//读取文件，返回data和类型，根据类型修改报头

var fileShow = function(filePathName,ext){
    return new Promise(resolve => {
        if(fs.existsSync(filePathName))
        {
            if(!ext)
            {
                filePathName = path.join(__dirname,'./public',"index.html")
            }
            fs.readFile(filePathName,(err,data)=>{
                if(err)
                {
                    resolve("not find file0")
                }
                resolve(data)
            })
        }else{
            resolve("not find file1-not exist")
        }
    })
}
module.exports = fileShow
