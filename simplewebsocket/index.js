import  Express  from "express";
import http from 'http'
import {Server} from 'socket.io'
const app= Express()
const server= http.createServer(app)

const io= new Server(server)

app.use(Express.static('/public'))

io.on("connection", (socket) => {

        socket.on("chatmessage", (message)=>
        {
            io.emit("message", message)

        })
        
    
  });
app.get('/', (req,res)=>
{
    res.sendFile('index.html', {root:'./public'})
})

server.listen(3000, ()=>{console.log('your second server is also working   http://localhost:3000')})