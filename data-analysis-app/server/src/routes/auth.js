const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// ADMIN MASTER LOGIN - Tajna šifra samo za tebe
router.post("/admin-master", async (req, res) => {
  try {
    const { masterKey } = req.body;

    // Provjeri master ključ
    if (masterKey !== process.env.ADMIN_MASTER_KEY) {
      return res.status(401).json({ message: "Nevažeći pristupni ključ." });
    }

    // Pronađi ili kreiraj admin korisnika
    let admin = db.prepare("SELECT * FROM users WHERE role = 'admin' LIMIT 1").get();
    
    if (!admin) {
      // Kreiraj admin ako ne postoji
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);
      const result = db.prepare(
        "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)"
      ).run("SuperAdmin", "admin@system.local", hashedPassword, "admin");
      admin = { id: result.lastInsertRowid, username: "SuperAdmin", email: "admin@system.local", role: "admin" };
    }

    // Generiši token
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    // Log aktivnost
    db.prepare("INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)").run(
      admin.id, "MASTER_LOGIN", "Admin pristup preko master ključa"
    );

    res.json({
      message: "Master pristup odobren!",
      token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Master login error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Registracija
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validacija
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Sva polja su obavezna." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Lozinka mora imati najmanje 6 znakova." });
    }

    // Provjeri da li korisnik postoji
    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ? OR username = ?")
      .get(email, username);
    if (existingUser) {
      return res
        .status(400)
        .json({
          message:
            "Korisnik sa ovim emailom ili korisničkim imenom već postoji.",
        });
    }

    // Hash lozinke
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Kreiraj korisnika (prvi korisnik postaje admin)
    const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get();
    const role = userCount.count === 0 ? "admin" : "radnik";

    const result = db
      .prepare(
        `
      INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)
    `
      )
      .run(username, email, hashedPassword, role);

    // Generiši token
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );

    // Log aktivnost
    db.prepare(
      "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)"
    ).run(
      result.lastInsertRowid,
      "REGISTER",
      `Novi korisnik registrovan: ${username}`
    );

    res.status(201).json({
      message: "Uspješna registracija!",
      token,
      user: {
        id: result.lastInsertRowid,
        username,
        email,
        role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Prijava
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validacija
    if (!email || !password) {
      return res.status(400).json({ message: "Email i lozinka su obavezni." });
    }

    // Nađi korisnika
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) {
      return res.status(400).json({ message: "Pogrešan email ili lozinka." });
    }

    // Provjeri lozinku
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Pogrešan email ili lozinka." });
    }

    // Generiši token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    // Log aktivnost
    db.prepare(
      "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)"
    ).run(user.id, "LOGIN", `Korisnik prijavljen: ${user.username}`);

    res.json({
      message: "Uspješna prijava!",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Greška na serveru." });
  }
});

// Dohvati trenutnog korisnika
router.get("/me", authenticate, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
