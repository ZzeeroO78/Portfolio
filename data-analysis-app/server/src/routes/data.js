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

// Export podataka u CSV (Menadžer+)
router.get(
  "/export",
  authenticate,
  authorizeMinRole("menadjer"),
  (req, res) => {
    try {
      const { startDate, endDate, category } = req.query;

      let query = "SELECT * FROM sales_data WHERE 1=1";
      const params = [];

      if (startDate) {
        query += " AND date >= ?";
        params.push(startDate);
      }
      if (endDate) {
        query += " AND date <= ?";
        params.push(endDate);
      }
      if (category && category !== "all") {
        query += " AND category = ?";
        params.push(category);
      }

      query += " ORDER BY date DESC";

      const data = db.prepare(query).all(...params);

      // Generiši CSV
      const headers = [
        "ID",
        "Proizvod",
        "Kategorija",
        "Količina",
        "Cijena",
        "Ukupno",
        "Datum",
      ];
      const csvRows = [headers.join(",")];

      data.forEach((row) => {
        csvRows.push(
          [
            row.id,
            `"${row.product_name}"`,
            `"${row.category}"`,
            row.quantity,
            row.price,
            row.total,
            row.date,
          ].join(",")
        );
      });

      const csv = csvRows.join("\n");

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=sales_export.csv"
      );
      res.send(csv);
    } catch (error) {
      console.error("Export error:", error);
      res.status(500).json({ message: "Greška pri exportu." });
    }
  }
);

// Dodaj novi zapis (Vlasnik+)
router.post("/", authenticate, authorizeMinRole("vlasnik"), (req, res) => {
  try {
    const { product_name, category, quantity, price, date } = req.body;

    if (!product_name || !category || !quantity || !price || !date) {
      return res.status(400).json({ message: "Sva polja su obavezna." });
    }

    // Automatsko računanje ukupne vrijednosti
    const total = parseFloat(quantity) * parseFloat(price);

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
    ).run(
      req.user.id,
      "DATA_ADD",
      `Dodan: ${product_name} | Količina: ${quantity} | Cijena: ${price}€ | Ukupno: ${total.toFixed(2)}€`
    );

    // Dohvati ažurirane statistike za real-time update
    const newStats = db
      .prepare(
        `
      SELECT 
        (SELECT SUM(total) FROM sales_data) as totalSales,
        (SELECT COUNT(*) FROM sales_data) as transactionCount
    `
      )
      .get();

    res.status(201).json({
      message: "Zapis uspješno dodan.",
      data: {
        id: result.lastInsertRowid,
        product_name,
        category,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        total,
        date,
        created_by: req.user.id,
      },
      stats: newStats,
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

    // Automatsko računanje ukupne vrijednosti
    const total = parseFloat(quantity) * parseFloat(price);
    const difference = total - existing.total;

    db.prepare(
      `
      UPDATE sales_data 
      SET product_name = ?, category = ?, quantity = ?, price = ?, total = ?, date = ?
      WHERE id = ?
    `
    ).run(product_name, category, quantity, price, total, date, id);

    // Log aktivnost sa detaljima promjene
    db.prepare(
      "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)"
    ).run(
      req.user.id,
      "DATA_UPDATE",
      `Ažuriran ID: ${id} | ${existing.product_name} → ${product_name} | Razlika: ${difference >= 0 ? "+" : ""}${difference.toFixed(2)}€`
    );

    res.json({
      message: "Zapis uspješno ažuriran.",
      data: {
        id: parseInt(id),
        product_name,
        category,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
        total,
        date,
      },
      previousTotal: existing.total,
      difference,
    });
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
