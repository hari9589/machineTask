import express,{Express} from "express";
import dotenv from "dotenv";
import appRouter from "./approutes";
import http from "http";
import {Server} from "socket.io";
const app:Express = express()

const server = http.createServer(app);;
let io = new Server(server);
dotenv.config();


app.use(express.json())
const PORT: String|Number = process.env.PORT || 9000;

// socket code for broadcast

io.on('connection', socket => {
     console.log(`new connection ${socket.id}`);


  socket.emit("message","your message");


  socket.on('message',(data)=>{
    console.log(data);
    
  })

  });




// socket code for broadcast


app.use(appRouter)

app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
    
})