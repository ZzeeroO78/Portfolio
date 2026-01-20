const express = require("express");
const db = require("../config/database");
const {
  authenticate,
  authorize,
  authorizeMinRole,
} = require("../middleware/auth");

const router = express.Router();

// Dohvati sve podatke o prodaji
router.get("/", authenticate, (req, res) => {
  try {
    const data = db
      .prepare(
        `
      SELECT s.*, u.username as created_by_name 
      FROM sales_data s 
      LEFT JOIN users u ON s.created_by = u.id 
      ORDER BY s.date DESC
    `
      )
      .all();

    res.json({ data });
  } catch (error) {
    console.error("Get data error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Dohvati statistiku (Menadžer+)
router.get("/stats", authenticate, authorizeMinRole("menadjer"), (req, res) => {
  try {
    // Ukupna prodaja
    const totalSales = db
      .prepare("SELECT SUM(total) as total FROM sales_data")
      .get();

    // Prodaja po kategorijama
    const salesByCategory = db
      .prepare(
        `
      SELECT category, SUM(total) as total, SUM(quantity) as quantity
      FROM sales_data GROUP BY category
    `
      )
      .all();

    // Prodaja po mjesecima
    const salesByMonth = db
      .prepare(
        `
      SELECT strftime('%Y-%m', date) as month, SUM(total) as total
      FROM sales_data GROUP BY month ORDER BY month
    `
      )
      .all();

    // Top proizvodi
    const topProducts = db
      .prepare(
        `
      SELECT product_name, SUM(quantity) as quantity, SUM(total) as total
      FROM sales_data GROUP BY product_name ORDER BY total DESC LIMIT 5
    `
      )
      .all();

    // Broj transakcija
    const transactionCount = db
      .prepare("SELECT COUNT(*) as count FROM sales_data")
      .get();

    res.json({
      stats: {
        totalSales: totalSales.total || 0,
        transactionCount: transactionCount.count,
        salesByCategory,
        salesByMonth,
        topProducts,
      },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Dodaj novi zapis (Vlasnik+)
router.post("/", authenticate, authorizeMinRole("vlasnik"), (req, res) => {
  try {
    const { product_name, category, quantity, price, date } = req.body;

    if (!product_name || !category || !quantity || !price || !date) {
      return res.status(400).json({ message: "Sva polja su obavezna." });
    }

    const total = quantity * price;

    const result = db
      .prepare(
        `
      INSERT INTO sales_data (product_name, category, quantity, price, total, date, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `
      )
      .run(product_name, category, quantity, price, total, date, req.user.id);

    // Log aktivnost
    db.prepare(
      "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)"
    ).run(req.user.id, "DATA_ADD", `Dodan zapis: ${product_name}`);

    res.status(201).json({
      message: "Zapis uspješno dodan.",
      data: {
        id: result.lastInsertRowid,
        product_name,
        category,
        quantity,
        price,
        total,
        date,
        created_by: req.user.id,
      },
    });
  } catch (error) {
    console.error("Add data error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Ažuriraj zapis (Vlasnik+)
router.put("/:id", authenticate, authorizeMinRole("vlasnik"), (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, category, quantity, price, date } = req.body;

    const existing = db
      .prepare("SELECT * FROM sales_data WHERE id = ?")
      .get(id);
    if (!existing) {
      return res.status(404).json({ message: "Zapis nije pronađen." });
    }

    const total = quantity * price;

    db.prepare(
      `
      UPDATE sales_data 
      SET product_name = ?, category = ?, quantity = ?, price = ?, total = ?, date = ?
      WHERE id = ?
    `
    ).run(product_name, category, quantity, price, total, date, id);

    // Log aktivnost
    db.prepare(
      "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)"
    ).run(req.user.id, "DATA_UPDATE", `Ažuriran zapis ID: ${id}`);

    res.json({ message: "Zapis uspješno ažuriran." });
  } catch (error) {
    console.error("Update data error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Obriši zapis (Vlasnik+)
router.delete("/:id", authenticate, authorizeMinRole("vlasnik"), (req, res) => {
  try {
    const { id } = req.params;

    const existing = db
      .prepare("SELECT * FROM sales_data WHERE id = ?")
      .get(id);
    if (!existing) {
      return res.status(404).json({ message: "Zapis nije pronađen." });
    }

    db.prepare("DELETE FROM sales_data WHERE id = ?").run(id);

    // Log aktivnost
    db.prepare(
      "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)"
    ).run(
      req.user.id,
      "DATA_DELETE",
      `Obrisan zapis: ${existing.product_name}`
    );

    res.json({ message: "Zapis uspješno obrisan." });
  } catch (error) {
    console.error("Delete data error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Dohvati aktivnosti (Admin only)
router.get("/logs", authenticate, authorize("admin"), (req, res) => {
  try {
    const logs = db
      .prepare(
        `
      SELECT al.*, u.username 
      FROM activity_logs al 
      LEFT JOIN users u ON al.user_id = u.id 
      ORDER BY al.created_at DESC 
      LIMIT 100
    `
      )
      .all();

    res.json({ logs });
  } catch (error) {
    console.error("Get logs error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

module.exports = router;
