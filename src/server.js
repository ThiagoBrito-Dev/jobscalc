const express = require("express");
const router = require("./routes");
const server = new express();

server.use(express.static("public"));
server.use(router);

server.listen(3000, () => console.log("Server is running"));
