const path = require('path')
const express = require("express")
//引入
var multer  = require('multer')
// var upload = multer({ dest: './pubilc/uploads' }) //上传到public/uploads里面 Multer 不会为你附加任何文件扩展名
var storage = multer.diskStorage({
    //配置文件目录  确定应将上传的文件存储在哪个文件夹中 
    destination: function (req, file, cb) {
      cb(null, './pubilc/uploads')
    },
    //文件夹内的文件应命名为什么
    filename: function (req, file, cb) {
        //文件后缀名
        
        let extname = path.extname(file.originalname)
        //拼接
        cb(null, file.fieldname + '-' + Date.now() + extname)
    }
  })
  var upload = multer({ storage: storage })

const app = express()

app.use(express.static("./pubilc"))


// app.post("/upload",upload.single("file1"),(req,res,next)=>{    //upload.single("file1") 接受的文件，“”里面的和form表单里面的name一致
//     res.send("上传成功！！",
//     {
//         body:req.body,
//         file:req.file,
//     })
// })
app.post("/upload",upload.array("file",2),(req,res,next)=>{
    res.send("上传成功！！")
})
app.listen(3000,function(){
    console.log("3000端口已经启动~")
})