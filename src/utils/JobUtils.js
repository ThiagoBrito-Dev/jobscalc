module.exports = {
  handleGettingRemainingTime(job) {
    let hasLessThanOneDayToFinish = false;
    let typeOfTimeRemaining = "dias"; // days
    let remainingTime = this.getRemainingDays(job);

    if (remainingTime === 1) {
      hasLessThanOneDayToFinish = true;

      typeOfTimeRemaining = "horas"; // hours
      remainingTime = this.getRemainingHours(job);

      if (remainingTime === 1) {
        typeOfTimeRemaining = "minuto"; // minute
        remainingTime = this.getRemainingMinutes(job);

        if (remainingTime > 1) {
          typeOfTimeRemaining += "s"; // minutes
        }
      }

      hasLessThanOneDayToFinish = remainingTime <= 0 && false;
    }

    return {
      remainingTime,
      typeOfTimeRemaining,
      hasLessThanOneDayToFinish,
    };
  },
  getRemainingDays(job) {
    const creationDate = new Date(job.started_at);
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
  getRemainingHours(job) {
    const creationDate = new Date(job.started_at);
    const hourInMs = 1000 * 60 * 60;
    let remainingHours;

    if (job["total-hours"] > job["daily-hours"]) {
      const initialRemainingDays = Math.ceil(
        job["total-hours"] / job["daily-hours"]
      );

      const creationDay = creationDate.getDate();
      const dueDay = creationDay + initialRemainingDays;
      const dueDate = creationDate.setDate(dueDay);
      const timeDifferenceInMs = dueDate - Date.now();

      remainingHours = Math.ceil(timeDifferenceInMs / hourInMs);
    } else {
      const creationHour = creationDate.getHours();
      const dueHour = creationHour + job["total-hours"];
      const dueDate = creationDate.setHours(dueHour); // based on the due hour
      const timeDifferenceInMs = dueDate - Date.now();

      remainingHours = Math.ceil(timeDifferenceInMs / hourInMs);
    }

    return remainingHours;
  },
  getRemainingMinutes(job) {
    const creationDate = new Date(job.started_at);
    const minuteInMs = 1000 * 60;
    let remainingMinutes;

    if (job["total-hours"] > job["daily-hours"]) {
      const initialRemainingDays = Math.ceil(
        job["total-hours"] / job["daily-hours"]
      );

      const creationDay = creationDate.getDate();
      const dueDay = creationDay + initialRemainingDays;
      const dueDate = creationDate.setDate(dueDay);
      const timeDifferenceInMs = dueDate - Date.now();

      remainingMinutes = Math.ceil(timeDifferenceInMs / minuteInMs);
    } else {
      const creationHour = creationDate.getHours();
      const dueHour = creationHour + job["total-hours"];
      const dueDate = creationDate.setHours(dueHour);
      const timeDifferenceInMs = dueDate - Date.now();

      remainingMinutes = Math.ceil(timeDifferenceInMs / minuteInMs);
    }

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
