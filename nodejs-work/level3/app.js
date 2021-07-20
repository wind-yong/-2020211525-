// 启动聊天的服务端      
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [] // 记录已经登录的用户

app.use(require('express').static("./public"))

app.get('/', function(req, res){
  res.redirect('/index.html');
});

io.on('connection', function(socket){
  socket.on('login', function (data) {
    let user = users.find(item=>item.username === data.username)
    if(user){
      //用户已经存在
      socket.emit('loginError',{msg:'登录失败'})
    }else{
      users.push(data)
      console.log(data);
      socket.emit('loginSuccess',data)
      socket.username = data.username
      //告诉所有的用户，有人加入聊天室了
      //广播功能 io.emit 表示广播事件
      io.emit('addUser',data)
      //修改用户列表
      io.emit('userList',users)
    }
      //监听用户断开连接
  socket.on('disconnect',()=>{
    // 把当前用户信息从users中删掉
    let idx = users.findIndex(item=>item.username === socket.username)
    users.splice(idx,1)
  
    //告诉所有人，xx离开了
    io.emit('delUser',{
      username: socket.username,
    })
    
    //用户列表更新
    io.emit('userList',users)

  })
  })
    //监听聊天的消息
    socket.on('sendMsg',function(data){
      console.log(data.username)
      //广播给所有用户
      io.emit('recieveMsg',data)
    })

  });
 

http.listen(3000, function(){
  console.log('3000服务启动成功了');
});