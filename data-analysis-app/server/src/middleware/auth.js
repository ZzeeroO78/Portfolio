const jwt = require("jsonwebtoken");
const db = require("../config/database");

// Verifikacija tokena
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Pristup odbijen. Nema tokena." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = db
      .prepare("SELECT id, username, email, role FROM users WHERE id = ?")
      .get(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Korisnik nije pronađen." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Nevažeći token." });
  }
};

// Provjera uloge
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Uloga '${req.user.role}' nema pristup ovoj funkciji.`,
      });
    }
    next();
  };
};

// Hijerarhija uloga
const roleHierarchy = {
  admin: 4,
  vlasnik: 3,
  menadjer: 2,
  radnik: 1,
};

// Provjera minimalne uloge
const authorizeMinRole = (minRole) => {
  return (req, res, next) => {
    const userLevel = roleHierarchy[req.user.role] || 0;
    const requiredLevel = roleHierarchy[minRole] || 0;

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        message: `Potrebna je minimalno uloga '${minRole}' za pristup.`,
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize, authorizeMinRole, roleHierarchy };
