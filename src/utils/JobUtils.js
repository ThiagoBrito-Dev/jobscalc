module.exports = {
  getRemainingDays(job) {
    const initialRemainingDays = Number(
      (job["total-hours"] / job["daily-hours"]).toFixed()
    );

    const creationDate = new Date(job.created_at);
    const dueDay = creationDate.getDate() + initialRemainingDays;
    const dueDayInMilliseconds = creationDate.setDate(dueDay);

    const timeDifferenceInMilliseconds = dueDayInMilliseconds - Date.now();
    const dayInMilliseconds = 1000 * 60 * 60 * 24;
    const remainingDays = Math.ceil(
      timeDifferenceInMilliseconds / dayInMilliseconds
    );

    return remainingDays;
  },
  calculateBudget(job, valuePerHour) {
    return valuePerHour * job["total-hours"];
  },
};
