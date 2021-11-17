const Profile = require("../models/Profile");
const Job = require("../models/Job");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  create(request, response) {
    return response.render("job");
  },
  async save(request, response) {
    const job = {
      name: request.body.name,
      "daily-hours": request.body["daily-hours"],
      "total-hours": request.body["total-hours"],
      created_at: Date.now(),
      started_at: null,
    };

    if (request.body["autostart"]) {
      job.started_at = Date.now();
    }

    await Job.create(job);
    return response.redirect("/");
  },
  async start(request, response) {
    const jobId = request.params.id;
    const startedAt = Date.now();
    await Job.start(startedAt, jobId);

    return response.redirect("/");
  },
  async show(request, response) {
    const jobs = await Job.get();
    const profile = await Profile.get();

    const jobId = request.params.id;
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return response.send("Job not found!");
    }

    job.budget = JobUtils.calculateBudget(
      profile["value-per-hour"],
      job["total-hours"]
    );

    return response.render("job-edit", { job });
  },
  async update(request, response) {
    const jobId = request.params.id;
    const updatedJob = {
      name: request.body.name,
      "daily-hours": request.body["daily-hours"],
      "total-hours": request.body["total-hours"],
    };

    await Job.update(updatedJob, jobId);
    return response.redirect(`/job/edit/${jobId}`);
  },
  async delete(request, response) {
    const jobId = request.params.id;
    await Job.delete(jobId);

    return response.redirect("/");
  },
};
