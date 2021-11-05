const Profile = require("../models/Profile");

module.exports = {
  index(request, response) {
    return response.render("profile", { profile: Profile.get() });
  },
  update(request, response) {
    const data = request.body;
    const weeksPerYear = 52;
    const averageWeeksWorkedInTheMonth =
      (weeksPerYear - data["vacation-per-year"]) / 12;
    const weeklyTotalWorkingHours =
      data["hours-per-day"] * data["days-per-week"];
    const monthlyTotalWorkingHours =
      weeklyTotalWorkingHours * averageWeeksWorkedInTheMonth;
    const valuePerHour = data["monthly-budget"] / monthlyTotalWorkingHours;

    Profile.update({
      ...Profile.get(),
      ...request.body,
      "value-per-hour": valuePerHour,
    });

    return response.redirect("/profile");
  },
};
