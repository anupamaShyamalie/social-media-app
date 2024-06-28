const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

//create user array
let users = [];

//ADD USER
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

//REMOVE USER
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

//find specific user to send the msg
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");
  //take userId and SocketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get msg
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage",{
      senderId,
      text
    })
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
    //if some disconnected here
    removeUser(socket.id);
    //to see this user again
    io.emit("getUsers", users);
  });
});
