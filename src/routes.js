const express = require("express");
const router = new express.Router();

const basePath = `${__dirname}/views`;

const Profile = {
  data: {
    name: "Thiago Brito",
    avatar: "https://github.com/trybrito.png",
    "monthly-budget": "R$ 4.000,00",
    "hours-per-day": 8,
    "days-per-week": 6,
    "vacation-per-year": 4,
    "value-per-hour": 75,
  },
  controllers: {
    index(request, response) {
      return response.render(`${basePath}/profile`, { profile: Profile.data });
    },
    update(request, response) {
      const data = request.body;
      const weeksPerYear = 52;
      const averageWeeksWorkedInTheMonth =
        (weeksPerYear - data["vacation-per-year"]) / 12;
      const weeklyTotalWorkingHours =
        data["hours-per-day"] * data["days-per-week"];
      const monthlyTotalWorkingHours =
        weeklyTotalWorkingHours * averageWeeksWorkedInTheMonth;
      const valuePerHour = data["monthly-budget"] / monthlyTotalWorkingHours;

      Profile.data = {
        ...Profile.data,
        ...request.body,
        "value-per-hour": valuePerHour,
      };

      return response.redirect("/profile");
    },
  },
};

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 1,
      created_at: Date.now(),
    },
    {
      id: 2,
      name: "One Two Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now(),
    },
  ],
  controllers: {
    index(request, response) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.getRemainingDays(job);
        const status = remaining <= 0 ? "done" : "progress";
        const budget = Job.services.calculateBudget(
          job,
          Profile.data["value-per-hour"]
        );

        return {
          ...job,
          remaining,
          status,
          budget,
        };
      });

      return response.render(`${basePath}/index`, { jobs: updatedJobs });
    },
    create(request, response) {
      return response.render(`${basePath}/job`);
    },
    save(request, response) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0; // .? => optional chaining operator

      Job.data.push({
        id: lastId + 1,
        name: request.body.name,
        "daily-hours": request.body["daily-hours"],
        "total-hours": request.body["total-hours"],
        created_at: Date.now(),
      });
      return response.redirect("/");
    },
    show(request, response) {
      const jobId = request.params.id;
      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return response.send("Job not found!");
      }

      job.budget = Job.services.calculateBudget(
        job,
        Profile.data["value-per-hour"]
      );

      return response.render(`${basePath}/job-edit`, { job });
    },
    update(request, response) {
      const jobId = request.params.id;
      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return response.send("Job not found!");
      }

      const updatedJob = {
        ...job,
        name: request.body.name,
        "daily-hours": request.body["daily-hours"],
        "total-hours": request.body["total-hours"],
      };

      Job.data = Job.data.map((job) => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob;
        }

        return job;
      });

      return response.redirect(`/job/${jobId}`);
    },
    delete(request, response) {
      const jobId = request.params.id;
      Job.data = Job.data.filter((job) => Number(job.id) !== Number(jobId));

      return response.redirect("/");
    },
  },
  services: {
    getRemainingDays(job) {
      const initialRemainingDays = Number(
        (job["total-hours"] / job["daily-hours"]).toFixed()
      );
      const creationDate = new Date(job.created_at);
      const dueDay = creationDate.getDate() + initialRemainingDays;
      const dueDayInMilliseconds = creationDate.setDate(dueDay);

      const timeDifferenceInMilliseconds = dueDayInMilliseconds - Date.now();
      const dayInMilliseconds = 1000 * 60 * 60 * 24;
      const remainingDays = Math.floor(
        timeDifferenceInMilliseconds / dayInMilliseconds
      );

      return remainingDays;
    },
    calculateBudget(job, valuePerHour) {
      return valuePerHour * job["total-hours"];
    },
  },
};

router.get("/", Job.controllers.index);

router.get("/job", Job.controllers.create);
router.post("/job", Job.controllers.save);

router.get("/job/:id", Job.controllers.show);
router.post("/job/:id", Job.controllers.update);
router.post("/job/delete/:id", Job.controllers.delete);

router.get("/profile", Profile.controllers.index);
router.post("/profile", Profile.controllers.update);

module.exports = router;
