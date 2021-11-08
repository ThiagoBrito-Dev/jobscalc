const Profile = require("../models/Profile");

module.exports = {
  async index(request, response) {
    return response.render("profile", { profile: await Profile.get() });
  },
  async update(request, response) {
    const profile = await Profile.get();

    const data = request.body;
    const weeksPerYear = 52;
    const averageWeeksWorkedInTheMonth =
      (weeksPerYear - data["vacation-weeks-per-year"]) / 12;
    const weeklyTotalWorkingHours =
      data["hours-per-day"] * data["days-per-week"];
    const monthlyTotalWorkingHours =
      weeklyTotalWorkingHours * averageWeeksWorkedInTheMonth;
    const valuePerHour = (
      data["monthly-budget"] / monthlyTotalWorkingHours
    ).toFixed(2);

    await Profile.update({
      ...profile,
      ...request.body,
      "value-per-hour": valuePerHour,
    });

    return response.redirect("/profile");
  },
};
