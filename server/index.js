import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import core from "cors"
const app =express();

app.use(core())


const server = new createServer(app)

const io = new Server(server)

app.get("/",(req,res)=>{
    res.send("<h1>Hello world</h1>");
})

io.on("connection",(Socket)=>{
    console.log("User connected")
    console.log("id: ",Socket.id)  

    Socket.on("message",({message,id1})=>{
        console.log(message);
        console.log(id1);
       io.to(id1).emit("messages",message)
    })


    Socket.on("disconnect",()=>{
        console.log(`${Socket.id} disconnected`)
    })

   
    
})


server.listen(3000,()=>console.log(`your server is running on 3000`))