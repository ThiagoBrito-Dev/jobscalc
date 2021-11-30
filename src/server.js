const express = require("express");
const router = require("./routes");
const path = require("path");
const server = new express();

server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "views"));
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(router);

server.listen(3000, () =>
  console.log("Server is running at <http://localhost:3000>")
);
