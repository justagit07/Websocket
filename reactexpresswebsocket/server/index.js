import  Express  from "express";
import { Server } from "socket.io";
import  cors  from "cors";
import http from 'http'
const app= Express()


app.use(cors())

const server= http.createServer(app)

const io= new Server(server, {
    cors:{
        origin: 'http://localhost:3000'
    }
})

io.on("connection", (socket)=>
{
        console.log('user is connecting', socket.id);

        socket.on("room",(data)=>
        {
            socket.join(data)
        })
        
        socket.on("send", (data)=>
        {
            console.log('this is found from the user', data)
            socket.to(data.roomno).emit("recievemsg", data)
        })
        
})


server.listen(3001, ()=>{console.log('your seever is running at  http://localhost:3001');
})