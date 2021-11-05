const express = require("express");
const router = require("./routes");
const server = new express();

server.set("view engine", "ejs");
server.use(express.static("public"));
server.use(express.urlencoded());
server.use(router);

server.listen(3000, () =>
  console.log("Server is running at <http://localhost:3000>")
);
