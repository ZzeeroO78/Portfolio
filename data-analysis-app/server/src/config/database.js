const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "../../data.db"));

// Kreiranje tabela
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'radnik' CHECK(role IN ('admin', 'vlasnik', 'menadjer', 'radnik')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sales_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    total REAL NOT NULL,
    date TEXT NOT NULL,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS activity_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    action TEXT NOT NULL,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Dodaj demo podatke ako tabela prazna
const count = db.prepare("SELECT COUNT(*) as count FROM sales_data").get();
if (count.count === 0) {
  const insertSale = db.prepare(`
    INSERT INTO sales_data (product_name, category, quantity, price, total, date)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const demoData = [
    ["Laptop Pro", "Elektronika", 15, 1200, 18000, "2024-01-15"],
    ["Wireless Mouse", "Elektronika", 50, 25, 1250, "2024-01-16"],
    ["Office Chair", "Namještaj", 20, 150, 3000, "2024-01-17"],
    ["Desk Lamp", "Namještaj", 35, 45, 1575, "2024-01-18"],
    ["Notebook Pack", "Kancelarija", 100, 12, 1200, "2024-01-19"],
    ["Printer Ink", "Kancelarija", 25, 35, 875, "2024-01-20"],
    ['Monitor 27"', "Elektronika", 12, 350, 4200, "2024-02-01"],
    ["Keyboard Mech", "Elektronika", 30, 85, 2550, "2024-02-05"],
    ["Standing Desk", "Namještaj", 8, 450, 3600, "2024-02-10"],
    ["Paper A4", "Kancelarija", 200, 5, 1000, "2024-02-15"],
    ["USB Hub", "Elektronika", 40, 30, 1200, "2024-03-01"],
    ["File Cabinet", "Namještaj", 10, 200, 2000, "2024-03-10"],
    ["Stapler Pro", "Kancelarija", 50, 15, 750, "2024-03-15"],
    ["Webcam HD", "Elektronika", 25, 80, 2000, "2024-04-01"],
    ["Ergonomic Chair", "Namještaj", 15, 350, 5250, "2024-04-15"],
  ];

  const insertMany = db.transaction((data) => {
    for (const item of data) {
      insertSale.run(...item);
    }
  });

  insertMany(demoData);
  console.log("Demo podaci dodani u bazu.");
}

module.exports = db;
