const Job = require("../models/Job");
const Profile = require("../models/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  async index(request, response) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const statusesCount = {
      total: jobs.length,
      progress: 0,
      done: 0,
    };
    let totalJobHours = 0;

    const updatedJobs = jobs.map((job) => {
      let onlyHoursLeft = false;
      let remaining;

      if (job["total-hours"] > job["daily-hours"]) {
        remaining = JobUtils.getRemainingDays(job);
      } else {
        onlyHoursLeft = true;
        remaining = JobUtils.getRemainingHours(job);
      }

      let status;

      if (remaining <= 0) {
        onlyHoursLeft = false;
        status = "done";
      } else {
        status = "progress";
        totalJobHours += Number(job["daily-hours"]);
      }

      statusesCount[status]++;

      const budget = JobUtils.calculateBudget(
        profile["value-per-hour"],
        job["total-hours"]
      );

      return {
        ...job,
        remaining,
        status,
        budget,
        onlyHoursLeft,
      };
    });

    const freeHours = profile["hours-per-day"] - totalJobHours;

    return response.render("index", {
      jobs: updatedJobs,
      profile,
      statusesCount,
      freeHours,
    });
  },
};
