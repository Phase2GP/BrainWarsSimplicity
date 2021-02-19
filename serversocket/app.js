const express = require("express");
const app = express();
const port = 3000;
const server = require("http").createServer(app);
const io = require("socket.io")(server);

let soal = [];
let totalQuestion = 50;
for (let i = 0; i < totalQuestion; i++) {
  let obj = {};
  let question = "";
  let answer = 0;
  let value1 = Math.ceil(Math.random() * 100);
  let value2 = Math.ceil(Math.random() * 100);
  let randomOperation = Math.floor(Math.random() * 4);
  if (randomOperation === 0) {
    question = `${value1} + ${value2}`;
    answer = value1 + value2;
  } else if (randomOperation === 1) {
    question = `${value1} - ${value2}`;
    answer = value1 - value2;
  } else if (randomOperation === 2) {
    question = `${value1} x ${value2}`;
    answer = value1 * value2;
  } else if (randomOperation === 3) {
    question = `${value1} / ${value2}`;
    answer = value1 / value2;
  }
  obj = {
    question,
    answer,
  };
  soal.push(obj);
}

let user = []

io.on("connection", function (socket) {
  console.log("Socket.io client connected");
  socket.emit("init", soal);
  io.emit("newServerUser", user)

  socket.on('newQuestion', function(payload){
    let newQuestion = {
      question: soal[payload].question,
      answer: soal[payload].answer
    }
    socket.emit("newServerQuestion", newQuestion)
  }),

  socket.on('addUser', function(payload){
    user.push(payload)
    console.log(user)
    io.emit("newServerUser", user)
  }),

  socket.on('updateScore', function(payload){
    user.forEach((el)=>{
      if(el.name === payload.name){
        el.score = payload.currentScore
        if(el.score === 20){
          user = el.name
        }
      } 
    })
    io.emit("newServerScore", user)
  }),

  socket.on('clearAll', function(payload){
    user = []
    socket.emit("newServerUser", user)
  })
});

server.listen(port, () => {
  console.log("Listening on port ", port);
});
