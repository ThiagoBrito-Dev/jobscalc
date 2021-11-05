let data = {
  name: "Thiago Brito",
  avatar: "https://github.com/trybrito.png",
  "monthly-budget": "4000.00",
  "hours-per-day": 8,
  "days-per-week": 6,
  "vacation-per-year": 4,
  "value-per-hour": 75,
};

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
};
