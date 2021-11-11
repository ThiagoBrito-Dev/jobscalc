const Database = require("./config");

const initializeDatabase = {
  async init() {
    const database = await Database();

    await database.exec(`CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget REAL,
      hours_per_day INT,
      days_per_week INT,
      vacation_weeks_per_year INT,
      value_per_hour REAL
    )`);
    await database.exec(`CREATE TABLE jobs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME,
      started_at DATETIME
    )`);
    await database.run(`INSERT INTO profile (
      name,
      avatar,
      monthly_budget,
      hours_per_day,
      days_per_week,
      vacation_weeks_per_year,
      value_per_hour
    ) VALUES (
      "Anônimo",
      "https://via.placeholder.com/180?text=180x180",
      0,
      0,
      0,
      0,
      0
    )`);

    await database.close();
  },
};

initializeDatabase.init();
