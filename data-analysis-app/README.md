# Data Analysis Application

Aplikacija za analizu podataka sa sistemom uloga (RBAC - Role Based Access Control).

## Uloge

- **Admin** - Pun pristup svemu, upravljanje korisnicima
- **Vlasnik** - Pristup svim izvještajima, može dodavati/brisati podatke
- **Menadžer** - Može vidjeti sve izvještaje i statistike
- **Radnik** - Osnovni pristup, može vidjeti samo svoje podatke

## Tehnologije

- **Frontend**: React + Vite + Tailwind CSS + Chart.js
- **Backend**: Node.js + Express + SQLite
- **Autentikacija**: JWT (JSON Web Tokens)

## Instalacija

```bash
# Instaliraj sve dependencies
npm run install:all

# Pokreni development servere
npm run dev
```

## Struktura

```
data-analysis-app/
├── client/          # React frontend
├── server/          # Node.js backend
└── package.json     # Root package.json
```

## API Endpoints

### Autentikacija

- `POST /api/auth/register` - Registracija
- `POST /api/auth/login` - Prijava
- `GET /api/auth/me` - Trenutni korisnik

### Korisnici (Admin only)

- `GET /api/users` - Lista korisnika
- `PUT /api/users/:id/role` - Promjena uloge

### Podaci

- `GET /api/data` - Dohvati podatke
- `POST /api/data` - Dodaj podatke (Vlasnik+)
- `DELETE /api/data/:id` - Obriši podatke (Vlasnik+)

## Autor

Portfolio Project
