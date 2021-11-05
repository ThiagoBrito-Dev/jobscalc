const express = require("express");
const router = new express.Router();

const basePath = `${__dirname}/views`;

const profile = {
  name: "Thiago Brito",
  avatar: "https://github.com/trybrito.png",
  "monthly-budget": "R$ 4.000,00",
  "hours-per-day": 8,
  "days-per-week": 6,
  "vacation-per-year": 4,
};
const jobs = [];

router.get("/", (request, response) => {
  return response.render(`${basePath}/index`);
});

router.get("/job", (request, response) => {
  return response.render(`${basePath}/job`);
});
router.post("/job", (request, response) => {
  jobs.push(request.body);
  console.log(jobs);
  return response.redirect("/");
});

router.get("/job/edit", (request, response) => {
  return response.render(`${basePath}/job-edit`);
});
router.get("/profile", (request, response) => {
  return response.render(`${basePath}/profile`, { profile });
});

module.exports = router;
