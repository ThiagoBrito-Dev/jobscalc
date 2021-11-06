const Database = require("../database/config");

module.exports = {
  async get() {
    const database = await Database();
    const data = await database.get("SELECT * FROM profile");
    await database.close();

    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "hours-per-day": data.hours_per_day,
      "days-per-week": data.days_per_week,
      "vacation-per-year": data.vacation_per_year,
      "value-per-hour": data.value_per_hour,
    };
  },
  async update(newData) {
    const database = await Database();
    database.run(`UPDATE profile SET
      name = "${newData.name}",
      avatar = "${newData.avatar}",
      monthly_budget = ${newData["monthly-budget"]},
      hours_per_day = ${newData["hours-per-day"]},
      days_per_week = ${newData["days-per-week"]},
      vacation_per_year = ${newData["vacation-per-year"]},
      value_per_hour = ${newData["value-per-hour"]}
    `);
    await database.close();
  },
};
