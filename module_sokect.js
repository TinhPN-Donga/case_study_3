const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("removeNotify", (msg) => {
  });

  socket.on("disconnect", () => {
  });
});

module.exports = io;