const Database = require("./config");

const initializeDatabase = {
  async init() {
    const database = await Database();

    await database.exec(`CREATE TABLE profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      avatar TEXT,
      monthly_budget INT,
      hours_per_day INT,
      days_per_week INT,
      vacation_weeks_per_year INT,
      value_per_hour INT
    )`);
    await database.exec(`CREATE TABLE jobs(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      daily_hours INT,
      total_hours INT,
      created_at DATETIME
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
      "Thiago Brito", 
      "https://github.com/trybrito.png", 
      4000, 
      6, 
      6, 
      4,
      70
    )`);
    await database.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "Pizzaria Guloso",
      2,
      1,
      1617514376018
    )`);
    await database.run(`INSERT INTO jobs (
      name,
      daily_hours,
      total_hours,
      created_at
    ) VALUES (
      "OneTwo Project",
      3,
      47,
      1617514376018
    )`);

    await database.close();
  },
};

initializeDatabase.init();
