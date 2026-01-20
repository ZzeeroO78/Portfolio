const express = require("express");
const db = require("../config/database");
const {
  authenticate,
  authorize,
  authorizeMinRole,
} = require("../middleware/auth");

const router = express.Router();

// Dohvati sve korisnike (Admin only)
router.get("/", authenticate, authorize("admin"), (req, res) => {
  try {
    const users = db
      .prepare(
        `
      SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC
    `
      )
      .all();

    res.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Promijeni ulogu korisnika (Admin only)
router.put("/:id/role", authenticate, authorize("admin"), (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ["admin", "vlasnik", "menadjer", "radnik"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Nevažeća uloga." });
    }

    // Ne dozvoli adminu da promijeni svoju ulogu
    if (parseInt(id) === req.user.id) {
      return res
        .status(400)
        .json({ message: "Ne možete promijeniti svoju ulogu." });
    }

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }

    db.prepare("UPDATE users SET role = ? WHERE id = ?").run(role, id);

    // Log aktivnost
    db.prepare(
      "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)"
    ).run(
      req.user.id,
      "ROLE_CHANGE",
      `Uloga korisnika ${user.username} promijenjena u ${role}`
    );

    res.json({ message: `Uloga korisnika uspješno promijenjena u '${role}'.` });
  } catch (error) {
    console.error("Update role error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Obriši korisnika (Admin only)
router.delete("/:id", authenticate, authorize("admin"), (req, res) => {
  try {
    const { id } = req.params;

    if (parseInt(id) === req.user.id) {
      return res
        .status(400)
        .json({ message: "Ne možete obrisati svoj račun." });
    }

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen." });
    }

    db.prepare("DELETE FROM users WHERE id = ?").run(id);

    // Log aktivnost
    db.prepare(
      "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)"
    ).run(req.user.id, "USER_DELETE", `Korisnik ${user.username} obrisan`);

    res.json({ message: "Korisnik uspješno obrisan." });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

module.exports = router;
