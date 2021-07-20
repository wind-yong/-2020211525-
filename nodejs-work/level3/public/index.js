var socket = io("http://127.0.0.1:3000")
//登录功能
var loginbtn = document.querySelector("#loginbtn")
var loginInput = document.querySelector("#username")
var username

loginbtn.addEventListener('click',function(){
    let name = loginInput.value
    console.log(name)
    socket.emit('login',{
        username:name,
    })
})

        socket.on('loginError',function(data){
            alert('该用户已经登录')
        })

        //监听登录成功事件
        socket.on('loginSuccess',function(data){
            //展示聊天框
            let logiinBox = document.querySelector(".login")
            let chatBox = document.querySelector(".content")
            logiinBox.style.display = "none";
            chatBox.style.display = "block";
            //个人信息
            let divMy = document.querySelector(".person .my")
            let span = document.createElement("span")
            span.innerHTML = "你是：" + data.username
            divMy.appendChild(span)

            username = data.username

        })

        //监听添加用户事件
        socket.on('addUser',data=>{
            // 告诉所有用户谁加入了群聊
            let msgBox = document.querySelector("#messages")
            let syeLi = document.createElement("li")
            syeLi.setAttribute("class","systemmsg")
            let div = document.createElement("div")
            div.innerHTML = data.username + "加入了群聊"
            div.setAttribute("class","sys_cont")
            syeLi.appendChild(div)
            msgBox.appendChild(syeLi)
    
        })
        //监听用户离开消息
        socket.on('delUser',data=>{
            // 告诉所有用户谁加入了群聊
            let msgBox = document.querySelector("#messages")
            let syeLi = document.createElement("li")
            syeLi.setAttribute("class","systemmsg")
            let div = document.createElement("div")
            div.innerHTML = data.username + "离开了群聊"
            div.setAttribute("class","sys_cont")
            syeLi.appendChild(div)
            msgBox.appendChild(syeLi)
    
        })
        // 监听用户列表
        socket.on('userList',data=>{
            //删除原来的所有子节点
            var divAll = document.querySelector(".person .allpepleo")
            var p = document.querySelectorAll(".person p")
            for(var i=0;i<p.length;i++)
            {
                divAll.removeChild(p[i])

            }

            data.forEach(element => {
                let allP = document.createElement("p")
                allP.innerHTML = element.username
                divAll.appendChild(allP)                
            })
          
        })

        //获得聊天内容
        var sendmsg = document.querySelector(".sendmsg")
        var sendBtn = document.querySelector(".send")
        //在点击事件里面
        sendBtn.addEventListener('click',function(){
            let content = sendmsg.value
            sendmsg.value = ""
            socket.emit('sendMsg',{
                msg: content,//(输入框中的内容)
                username:username,
            })
        })
        
        //监听聊天的消息
        socket.on('recieveMsg',function(data){
            let msgBox = document.querySelector("#messages")
            
            //把接受到的消息显示到聊天窗口中并区分是自己发的还是别人发的 
            if(data.username===username)
            {
                let myLi = document.createElement("li")
                myLi.setAttribute("class","mymsg")

                let d = document.createElement("div")
                d.setAttribute("class","username")
                d.innerHTML = data.username
                myLi.appendChild(d)

                let p = document.createElement("p")
                p.setAttribute("class","mymsg_cont")
                p.innerHTML = data.msg
                myLi.appendChild(p)
                msgBox.appendChild(myLi)
           
            }else{
                let myLi = document.createElement("li")
                myLi.setAttribute("class","othermsg")

                let d = document.createElement("div")
                d.setAttribute("class","username")
                d.innerHTML = data.username
                myLi.appendChild(d)

                let p = document.createElement("p")
                p.setAttribute("class","othermsg_cont")
                p.innerHTML = data.msg
                myLi.appendChild(p)
                msgBox.appendChild(myLi)
             
            }
            // console.log(data)
        })