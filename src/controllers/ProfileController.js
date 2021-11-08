const Profile = require("../models/Profile");

module.exports = {
  async index(request, response) {
    const profile = await Profile.get();
    profile["monthly-budget"] = Number(
      profile["monthly-budget"]
    ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    return response.render("profile", { profile });
  },
  async update(request, response) {
    const profile = await Profile.get();

    const data = request.body;
    data["monthly-budget"] = Number(
      data["monthly-budget"].replace(/[^0-9\,]/g, "").replace(",", ".")
    ).toFixed(2);

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
