const Job = require("../models/Job");
const Profile = require("../models/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  index(request, response) {
    const jobs = Job.get();
    const profile = Profile.get();

    const statusesCount = {
      total: jobs.length,
      progress: 0,
      done: 0,
    };
    let totalJobHours = 0;

    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.getRemainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";

      totalJobHours =
        status == "progress" && totalJobHours + Number(job["daily-hours"]);
      statusesCount[status]++;

      const budget = JobUtils.calculateBudget(job, profile["value-per-hour"]);

      return {
        ...job,
        remaining,
        status,
        budget,
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
