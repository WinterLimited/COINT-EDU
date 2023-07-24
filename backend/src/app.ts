import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

// import schedule from 'node-schedule'
import schedule from './Scheduler/Scheduler'
import http from "http";
import express from "express";
import { applyMiddleware, commonHandlers, errorHandlers } from "./coint/common/middleware";
import { applyRoutes, controllers } from "./routes";
import cors from 'cors'


process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});

process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

const app: express.Express = express();
app.use('/cps_front/static', express.static('static'))
// if coused entity.too.large error
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// const corsOptions = {
//   origin: ['52.53.213.161:8000','127.0.0.1:8000', '*'],
//   method: ['POST' , 'GET' , '*'],
//   credentials: false
// };
// app.use(cors(corsOptions))

applyMiddleware(commonHandlers, app);
applyRoutes(controllers, app);
applyMiddleware(errorHandlers, app);

const { PORT = 5500 } = process.env;
const server = http.createServer(app);
// const io = require('socket.io')(server)

// io.on('connection', function(socket: any){

//   socket.on('chat' , function(data: any){

//     const rtnMesage = {
//       id: data.id,
//       message: data.message
//     }
//     socket.broadcast.emit('chat' , rtnMesage)
//   });
// });

// schedule.scheduler()

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);


