# Data Analysis Application

Profesionalna aplikacija za analizu podataka sa sistemom autentifikacije, upravljanjem korisnicima i naprednim vizualizacijama.

🌐 **Live Demo:** [https://data-analysis-app-q6t2.onrender.com](https://data-analysis-app-q6t2.onrender.com)

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-live-brightgreen)

## 🚀 Karakteristike

### Autentifikacija i Sigurnost

- ✅ JWT bazirana autentifikacija
- ✅ Sistem uloga (radnik, menadjer, vlasnik, admin)
- ✅ Hijerarhijski pristup kontroli
- ✅ Zaštićene API rute
- ✅ Password hashing (bcrypt)
- ✅ Activity logging

### Dashboard i Analitika

- ✅ Interaktivni grafikoni (Chart.js)
- ✅ Statistike prihoda po kategorijama
- ✅ Trend analiza kroz vrijeme
- ✅ Filter po datumskom rasponu
- ✅ Export podataka u CSV

### Upravljanje Podacima

- ✅ CRUD operacije
- ✅ Paginacija
- ✅ Sortiranje po kolonama
- ✅ Pretraga i filtriranje
- ✅ CSV Export

### Korisničko Iskustvo

- ✅ Responzivan dizajn
- ✅ Dark/Light mode
- ✅ Toast notifikacije
- ✅ Error boundaries
- ✅ Loading states

## 📋 Tehnologije

### Frontend

- React 18
- Vite 5
- Tailwind CSS 3
- Chart.js 4
- React Router 6
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express.js
- SQLite (better-sqlite3)
- JWT (JSON Web Tokens)
- bcryptjs

## 🛠️ Instalacija

### Preduvjeti

- Node.js 18+
- npm ili yarn

### Koraci

1. **Kloniraj repozitorij**

```bash
git clone https://github.com/your-username/Portfolio.git
cd Portfolio/data-analysis-app
```

2. **Instaliraj backend dependencies**

```bash
cd server
npm install
```

3. **Konfiguriši environment varijable**

```bash
# Kopiraj .env.example u .env i podesi vrijednosti
cp .env.example .env
```

4. **Instaliraj frontend dependencies**

```bash
cd ../client
npm install
```

5. **Pokreni development servere**

Backend (port 5000):

```bash
cd server
npm run dev
```

Frontend (port 3000):

```bash
cd client
npm run dev
```

## 🔐 Sistem Uloga

| Uloga    | Nivo | Pristup                                   |
| -------- | ---- | ----------------------------------------- |
| radnik   | 1    | Pregled dashboarda i podataka             |
| menadjer | 2    | + Sve od radnika                          |
| vlasnik  | 3    | + Upravljanje podacima (CRUD)             |
| admin    | 4    | + Upravljanje korisnicima, Pregled logova |

## 📁 Struktura Projekta

```
data-analysis-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable komponente
│   │   ├── context/        # React Context (Auth, Theme)
│   │   ├── pages/          # Page komponente
│   │   ├── services/       # API services
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Database konfiguracija
│   │   ├── middleware/     # Auth middleware
│   │   ├── routes/         # API routes
│   │   └── index.js        # Entry point
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔌 API Endpoints

### Auth Routes

```
POST /api/auth/register     # Registracija korisnika
POST /api/auth/login        # Prijava
POST /api/auth/admin-master # Admin master pristup
PUT  /api/auth/change-password # Promjena lozinke
```

### Data Routes

```
GET    /api/data            # Svi podaci
GET    /api/data/stats      # Statistike
GET    /api/data/export     # CSV Export
POST   /api/data            # Kreiranje zapisa (vlasnik+)
PUT    /api/data/:id        # Ažuriranje (vlasnik+)
DELETE /api/data/:id        # Brisanje (vlasnik+)
```

### User Routes (Admin only)

```
GET    /api/users           # Svi korisnici
PUT    /api/users/:id/role  # Promjena uloge
DELETE /api/users/:id       # Brisanje korisnika
GET    /api/users/logs      # Activity logs
```

## 🎨 Dark Mode

Aplikacija podržava automatsko prepoznavanje sistemskih preferencija i manuelno prebacivanje između svijetlog i tamnog načina. Postavke se čuvaju u localStorage.

## 📊 Grafikoni

Dashboard koristi Chart.js za vizualizaciju:

- **Prihod po kategorijama** - Doughnut chart
- **Trend prodaje** - Line chart sa vremenskim prikazom

## 🔒 Sigurnosne Preporuke za Produkciju

1. Promijeni `JWT_SECRET` u `.env`
2. Promijeni `ADMIN_MASTER_KEY`
3. Koristi HTTPS
4. Postavi rate limiting
5. Koristi production database (PostgreSQL/MySQL)
6. Dodaj CORS konfiguraciju za specifične domene

## 📝 Environment Varijable

```env
PORT=5000
JWT_SECRET=your-secure-secret-key
JWT_EXPIRE=7d
ADMIN_MASTER_KEY=your-admin-master-key
```

## 🚀 Deployment

### Build za produkciju

```bash
# Frontend build
cd client
npm run build

# Backend - pokreni sa PM2 ili sličnim
cd server
npm start
```

### Docker (opciono)

```bash
docker-compose up -d
```

## 📄 Licenca

MIT License - slobodno koristi za osobne i komercijalne projekte.

## 👤 Autor

Emin.S

---

⭐ Ako ti je projekt koristan, ostavi zvjezdicu na GitHubu!
