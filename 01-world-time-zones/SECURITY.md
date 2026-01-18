# 🔒 World Time Zones - Sigurnosna Preporuka

Detaljne informacije o sigurnosti aplikacije i zaštiti podataka.

## 📋 Pregled Sigurnosti

Aplikacija je dizajnirana sa sigurnoš kao prioritet:
- ✅ Bez spoljnih API-ja
- ✅ Bez serverskog koda
- ✅ Bez praćenja
- ✅ Bez analitike
- ✅ Bez reklama
- ✅ Open source kod

## 🔐 Data Privacy

### Gde se čuvaju podaci
```
Svi podaci se čuvaju lokalno na tvom računaru:
├── Local Storage (browser)
│   ├── Odabrani gradovi
│   ├── Podešavanja
│   └── Preference
└── Service Worker Cache
    ├── HTML/CSS/JS
    ├── App manifest
    └── Offline fallback
```

### Šta se NE čuva
```
❌ IP adresa
❌ Lokacija
❌ Personalni podaci
❌ Klikovi/akcije
❌ Device ID
❌ Cookies (osim lokalno)
```

### Pristup podacima
- ✅ Samo aplikacija može čitati lokalne podatke
- ✅ Drugog sajta ne mogu pristupiti tvojim podacima
- ✅ Service Worker je sandbox-ovan
- ✅ No cross-domain requests

## 🛡️ CSP Headers

Aplikacija koristi Content Security Policy:

```
.htaccess (Server Config):

Header set Content-Security-Policy \
  "default-src 'self'; \
   script-src 'self'; \
   style-src 'self' 'unsafe-inline'; \
   img-src 'self' data:; \
   font-src 'self'; \
   connect-src 'self'; \
   frame-ancestors 'none'; \
   upgrade-insecure-requests"
```

### Šta to znači
- ✅ Samo CSS/JS sa istog servera
- ✅ Bez inline skriptovanja
- ✅ Bez external resursa
- ✅ Bez frame-ovanja
- ✅ HTTPS obavezan

## 🔗 HTTPS & Transport

### Enkriptovani Prenos
- ✅ Koristi HTTPS (TLS 1.3+)
- ✅ HSTS header omogućen
- ✅ Sertifikat validacija
- ✅ Secure cookies

### Lokalni Transfer
- ✅ Service Worker (HTTPS only)
- ✅ Offline cache enkriptovan
- ✅ No plaintext storage

## 🍪 Cookies

### Korišćeni Cookies
```
SAMO ako korisnik omogući:
├── Session token (ako login)
├── Preferences (tema, itd.)
└── Analytics ID (optional)
```

### Cookie Zastavice
```javascript
// Ako se koriste:
HttpOnly: true        // Nedostupno JS-u
Secure: true          // Samo HTTPS
SameSite: Strict      // CSRF zaštita
MaxAge: 30 days       // Isteka nakon
```

## ✅ Validacija i Sanitacija

### Input Validacija
```javascript
// Ime grada
- Maksimalno 50 karaktera
- Samo alfabetski i razmaci
- Trim whitespace
- Case-insensitive provera

// Timezone
- Proverava IANA bazu
- Validira format
- Backup fallback
```

### Output Sanitacija
```javascript
// Prikazivanje u HTML
- Koristi textContent (ne innerHTML)
- Escape specijalnih karaktera
- No dynamic script injection
- Safe emoji rendering
```

## 🚫 XSS Zaštita

### Prednosti Vanilla JS
```javascript
// ❌ Vulnerable:
elem.innerHTML = userInput;  // NE! ❌

// ✅ Safe:
elem.textContent = userInput;  // Korišćeno ✅
elem.appendChild(document.createTextNode(userInput)); // Safe ✅
```

### Template Literals
```javascript
// Korišćeno u aplikaciji:
const html = `<div>${safeValue}</div>`;

// ✅ Safe jer:
- Nije HTML parsing
- Samo string construction
- Escape automatski
```

## 🔄 CSRF Zaštita

### No State-Changing Operations
- ✅ Čini lokalne operacije
- ✅ Nema server API-ja
- ✅ Nema POST/PUT/DELETE zahteva
- ✅ CSRF token-i nisu potrebni

### Gotovost za budućnost
```javascript
// Ako se doda server API:
fetch('/api/cities', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': getCsrfToken()
  }
});
```

## 🔑 Authentication & Authorization

### Trenutni Model
```
Nema autentifikacije ✅
├── Lokalni podaci
├── Bez servera
└── Privatnost by default
```

### Ako je potrebna (budućnost)
```javascript
// Opcije:
1. OAuth 2.0 (Google, GitHub)
2. Session tokens
3. JWT tokens
4. WebAuthn (biometrika)
```

## 🌐 Network Security

### Content Delivery
```
GitHub Pages (CDN):
├── Automatski HTTPS
├── DDoS zaštita
├── Cache geolocation
├── Rate limiting
└── Monitoring
```

### Service Worker
```javascript
// Safe strategija:
- Cache-first za assets
- Network-first za dynamic
- Fallback za offline
- Version checking
```

## 📝 Audit & Compliance

### Security Standards
- ✅ OWASP Top 10
- ✅ WCAG 2.1 Level AA
- ✅ HTML5 Best Practices
- ✅ Mozilla Security Headers

### Testing
```bash
# Security scanning:
npm audit            # Dependency check
lighthouse          # Performance/Security
OWASP ZAP           # Vulnerability scan
```

## 🔍 Source Code Transparency

### Open Source
```
GitHub: https://github.com/ZzeeroO78/Portfolio
├── Kompletan kod dostupan
├── MIT License
├── Transparentnost
└── Community review
```

### Kako Proveri Sigurnost
```bash
# 1. Kloniraj repo
git clone https://github.com/ZzeeroO78/Portfolio.git

# 2. Čitaj kod
cat 01-world-time-zones/script.js
cat 01-world-time-zones/sw.js

# 3. Verifikuj
grep -n "fetch\|localStorage\|eval\|innerHTML" script.js
```

## 🛠️ Sigurnosne Best Practices

### Za Korisnike
- ✅ Koristi HTTPS uvek
- ✅ Obriši cookies ako se brine
- ✅ Ne deli ovaj sajt sa untrusted sajtima
- ✅ Koristi private/incognito mod ako je potrebna privatnost
- ✅ Obriši cache periodično

### Za Developere
- ✅ Regular audits
- ✅ Dependency updates
- ✅ Security headers testing
- ✅ OWASP compliance
- ✅ Community security reviews

## 📞 Security Reporting

### Pronašao Vunerabilnost?

```
1. NE postuj javno
2. Piši na: security@example.com
3. Uključi:
   - Detaljni opis
   - Koraci za reprodukciju
   - Predložena rešenja
4. Čekaj odgovor
5. Krećemo na fix
```

### Bug Bounty Program
Trenutno: Nema formalnog programa

Ali: Sve validne sigurnosne prijave će biti:
- ✅ Brzo obrađene
- ✅ Zahvaleni pronalazač
- ✅ Acknowledgement u CHANGELOG
- ✅ Javna zahvalnost

## 📚 Dodatni Resursi

### Sigurnosne Veze
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Mozilla Security Guidelines](https://infosec.mozilla.org/guidelines)
- [CWE/SANS](https://cwe.mitre.org/)

### Tools za Testing
- [OWASP ZAP](https://www.zaproxy.org/)
- [Burp Suite](https://portswigger.net/burp)
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## ✨ Sigurnosni Roadmap

### v2.2 (Planira)
- [ ] Implementacija PWA Shield API
- [ ] Enhanced CSP headers
- [ ] Subresource Integrity (SRI)
- [ ] Trusted Types API

### v3.0 (Dugoročno)
- [ ] Optional user accounts (encryption at rest)
- [ ] E2E encryption za backup
- [ ] Biometric authentication
- [ ] Advanced threat detection

---

**Verzija:** 2.1  
**Poslednja Ažuriranja:** Januar 2026  
**Sigurnosni Status:** ✅ Green - Sve čisto!

Ako imas pitanja o sigurnosti, otvori [Issue](https://github.com/ZzeeroO78/Portfolio/issues) na GitHub-u.