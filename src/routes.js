const express = require("express");
const router = new express.Router();

router.get("/", (request, response) => {
  return response.sendFile(`${__dirname}/views/index.html`);
});

module.exports = router;
