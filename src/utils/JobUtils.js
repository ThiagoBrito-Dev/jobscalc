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
  getRemainingHours(job) {
    const dateFormatter = Intl.DateTimeFormat("pt-BR", {
      hour: "numeric",
    });

    const jobCreationHour = dateFormatter.format(job.created_at);
    const jobDueHour = Number(jobCreationHour) + Number(job["total-hours"]);
    const currentHour = dateFormatter.format(Date.now());
    let remainingHours = jobDueHour - currentHour;

    return remainingHours;
  },
  calculateBudget(valuePerHour, jobTotalHours) {
    const budget = (valuePerHour * jobTotalHours).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2,
    });

    return budget;
  },
};
