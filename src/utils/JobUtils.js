module.exports = {
  handleGettingRemainingTime(job) {
    const creationDate = new Date(job.created_at);
    let hasLessThanOneDayToFinish = false;
    let typeOfTimeRemaining = "";
    let remainingTime;

    if (job["total-hours"] > job["daily-hours"]) {
      typeOfTimeRemaining = "dia"; // day
      remainingTime = this.getRemainingDays(creationDate, job);
    } else {
      hasLessThanOneDayToFinish = true;
      typeOfTimeRemaining = "hora"; // hour
      remainingTime = this.getRemainingHours(creationDate, job);

      if (remainingTime === 1) {
        typeOfTimeRemaining = "minuto"; // minute
        remainingTime = this.getRemainingMinutes(creationDate);
      }

      hasLessThanOneDayToFinish = remainingTime <= 0 && false;
    }

    if (remainingTime > 1) {
      typeOfTimeRemaining += "s"; // days/hours/minutes
    }

    return {
      remainingTime,
      typeOfTimeRemaining,
      hasLessThanOneDayToFinish,
    };
  },
  getRemainingDays(creationDate, job) {
    const initialRemainingDays = Number(
      (job["total-hours"] / job["daily-hours"]).toFixed()
    );

    const creationDay = creationDate.getDate();
    const dueDay = creationDay + initialRemainingDays;
    const dueDate = creationDate.setDate(dueDay); // based on the due day
    const timeDifferenceInMs = dueDate - Date.now();
    const dayInMs = 1000 * 60 * 60 * 24;
    const remainingDays = Math.ceil(timeDifferenceInMs / dayInMs);

    return remainingDays;
  },
  getRemainingHours(creationDate, job) {
    // const creationDay = creationDate.getDate();
    // const currentDate = new Date(Date.now());
    // const currentDay = currentDate.getDate();
    // const difference = currentDay - creationDay;

    const creationHour = creationDate.getHours();
    const dueHour = creationHour + Number(job["total-hours"]);
    const dueDate = creationDate.setHours(dueHour); // based on the due hour
    const timeDifferenceInMs = dueDate - Date.now();
    const hourInMs = 1000 * 60 * 60;
    const remainingHours = Math.ceil(timeDifferenceInMs / hourInMs);

    return remainingHours;
  },
  getRemainingMinutes(creationDate) {
    const dueMinute = creationDate.getMinutes();
    const dueDate = creationDate.setMinutes(dueMinute); // based on the due minute
    const timeDifferenceInMs = dueDate - Date.now();
    const minuteInMs = 1000 * 60;
    const remainingMinutes = Math.ceil(timeDifferenceInMs / minuteInMs);

    return remainingMinutes;
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
