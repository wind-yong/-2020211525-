const path = require('path')
var multer  = require('multer')
var tool = function (){

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
    return upload
}
module.exports = tool()