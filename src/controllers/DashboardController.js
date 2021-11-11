const Job = require("../models/Job");
const Profile = require("../models/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  async index(request, response) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const statusesCount = {
      total: jobs.length,
      unstarted: 0,
      progress: 0,
      done: 0,
    };
    let totalJobHours = 0;

    const updatedJobs = jobs.map((job) => {
      const { remainingTime, typeOfTimeRemaining, hasLessThanOneDayToFinish } =
        JobUtils.handleGettingRemainingTime(job);
      let status;

      if (!job.started_at) {
        status = "unstarted";
      } else if (remainingTime <= 0) {
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
        status,
        budget,
        remainingTime,
        typeOfTimeRemaining,
        hasLessThanOneDayToFinish,
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
