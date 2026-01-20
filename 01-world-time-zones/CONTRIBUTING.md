# 🤝 World Time Zones - Uputstva za Doprinos

Hvala što razmatrate doprinos! Vaš kod i ideje su cenjena.

## 📋 Kako Početi

### 1. Fork Projekta
```bash
# Idi na GitHub
https://github.com/ZzeeroO78/Portfolio

# Klikni "Fork" gumb (desno gore)
# To kreira vašu kopiju projekta
```

### 2. Kloniraj Fork
```bash
# Kloniraj VAŠU kopiju (ne originala)
git clone https://github.com/YOUR_USERNAME/Portfolio.git
cd Portfolio

# Dodaj original kao upstream
git remote add upstream https://github.com/ZzeeroO78/Portfolio.git
```

### 3. Kreiraj Branch
```bash
# Kreiraj feature branch
git checkout -b feature/amazing-feature

# Ili bug fix branch
git checkout -b bugfix/critical-issue
```

## 🛠️ Razvoj

### Pokreni Lokalno
```bash
cd Portfolio/01-world-time-zones

# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# Ili nginx
nginx -s start
```

### Otvaraj u Pretraživaču
```
http://localhost:8000
```

## 📝 Kodne Konvencije

### JavaScript
```javascript
// ✅ Good: Jasno i čitljivo
function addCityToList(cityName, timezone) {
    if (!cityName || !timezone) return false;
    cities.push({ name: cityName, timezone });
    return true;
}

// ❌ Bad: Nejasno i teško čitati
function add(c, tz) {
    cities.push({n: c, t: tz});
}
```

### CSS
```css
/* ✅ Good: Semantička imena */
.city-card {
    background: var(--card-bg);
    padding: 20px;
}

/* ❌ Bad: Generička imena */
.box {
    background: white;
    padding: 20px;
}
```

### HTML
```html
<!-- ✅ Good: Semantički elementi -->
<article class="city-card">
    <header>
        <h2>City Name</h2>
    </header>
    <time>18:45:30</time>
</article>

<!-- ❌ Bad: Generic divs -->
<div class="card">
    <div>City Name</div>
    <div>18:45:30</div>
</div>
```

## 🧪 Testiranje

### Ručno Testiranje
```bash
# Testiraj sve glavne funkcije:
□ Dodaj grad
□ Ukloni grad
□ Pretraži grad
□ Sortiraj po imenu/vremenu
□ Toggle dark mode
□ Promeni time format
□ Proveraj weather
□ Testiraj offline (DevTools Network)
```

### Cross-Browser Testing
```bash
# Testiraj na:
□ Chrome (latest)
□ Firefox (latest)
□ Safari (latest)
□ Edge (latest)
□ Mobile Chrome
□ Mobile Safari
```

### Performance Testing
```bash
# U Chrome DevTools:
1. Open DevTools (F12)
2. Performance tab
3. Record actions
4. Analise CPU/Memory/FPS
5. Check za anomalije
```

## 📤 Podnošenje Pull Requesta

### Pre Podnošenja
```bash
# 1. Sinhronizuj sa upstream
git fetch upstream
git rebase upstream/main

# 2. Testiraj još jednom
# 3. Obriši debug console.log()-e
# 4. Formatiraj kod

# 5. Commit sa jasnom porukom
git commit -m "feat: Add city timezone validation"
```

### Commit Poruke
Koristi [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Feature
git commit -m "feat: Add weather forecast integration"

# Bug fix
git commit -m "fix: Resolve timezone offset calculation"

# Documentation
git commit -m "docs: Update README with examples"

# Performance
git commit -m "perf: Optimize city search algorithm"

# Style
git commit -m "style: Format CSS with prettier"
```

### Push na Fork
```bash
git push origin feature/amazing-feature
```

### Otvori Pull Request
1. Idi na GitHub fork
2. Klikni "Compare & pull request"
3. Popuni template
4. Dodaj opis promena
5. Klikni "Create pull request"

## 📋 Pull Request Template

```markdown
## Opis
Kratko objasni šta ovaj PR čini.

## Tip Promena
- [ ] Bug fix
- [ ] Nowa feature
- [ ] Documentation update
- [ ] Performance improvement

## Kako Testirati
Koraci za reprodukciju/testiranje:
1. Step 1
2. Step 2
3. Verify...

## Checklist
- [ ] Kod je testiran
- [ ] Nema console.log()-a
- [ ] Dokumentacija ažurirana
- [ ] Responsive na mobilima
- [ ] Dark mode podrška
- [ ] No Breaking changes

## Screenshots (ako je UI promena)
[Paste screenshots]

## Povezane Issues
Closes #123
Fixes #456
```

## 🎯 Vrste Doprinos

### Bug Fixes 🐛
```
1. Otvori Issue sa detalji
2. Kreiraj branch: bugfix/issue-name
3. Fiksuj bug
4. Dodaj comment u kod
5. Testiraj
6. Podnesi PR sa Closes #
```

### Nove Feature ✨
```
1. Otvori Feature Issue prvo
2. Diskutuj zajednici
3. Kreiraj branch: feature/name
4. Implementira feature
5. Dokumentira
6. Testiraj komprehenzivno
7. Podnesi PR
```

### Dokumentacija 📚
```
1. Otvori branch: docs/topic
2. Ažuriraj/kreiraj fajl
3. Testiraj markdown
4. Podnesi PR
```

### Localization 🌍
```
1. Kreiraj branch: i18n/language
2. Dodaj language file
3. Testiraj prikaz
4. Podnesi PR
```

## 🔍 Pregled Koda

Vaš kod će biti pregledан od moderatora. Mogući komentari:

### Česte Povratne Informacije
```
✅ Great catch!
✅ Nice optimization!
❓ Can you add comments here?
❌ This breaks offline mode
⚠️ Need better error handling
🔧 Follow our code style
```

## 📚 Resursi

### Dokumentacija
- [JavaScript MDN](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)
- [PWA Docs](https://web.dev/progressive-web-apps/)

### Alati
- [VS Code](https://code.visualstudio.com/)
- [Chrome DevTools](https://developer.chrome.com/devtools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Prettier](https://prettier.io/) - Code formatter

### Veze
- [GitHub Help](https://help.github.com/)
- [Git Guide](https://git-scm.com/book)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 💬 Komunikacija

### Pronašao Problem?
1. Proveris existing Issues
2. Otvori novi Issue
3. Dodaj detaljne stepove
4. Priloži screenshot/log

### Predlažeš Feature?
1. Otvori Discussion
2. Diskutuj sa drugima
3. Ako je odobren, otvori Feature Issue
4. Počni sa razvojem

### Pitanja?
- 💬 GitHub Discussions
- 📧 Email
- 📞 Discord (ako je dostupan)

## 🎓 Kako Smo Kod Strukturirani

```
Portfolio/
├── 01-world-time-zones/       # Projekat 1
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── manifest.json
│   ├── sw.js
│   ├── README.md
│   └── ...
├── 02-project-name/           # Projekat 2 (budućnost)
└── 03-project-name/           # Projekat 3 (budućnost)
```

## 🚀 Merge & Deploy

Nakon što se PR one pregleda i odobri:

1. ✅ Code Review
2. ✅ Automated Tests
3. ✅ Manual Testing
4. ✅ Merge na main
5. 🚀 Auto Deploy na GitHub Pages
6. ✨ Live na Production

## 📊 Doprinos Credit

Svi doprinos će biti:
- Naveden u CONTRIBUTORS.md
- Zahvaljen u commit poruci
- Priznan u release notes
- Hvala od celog tima!

## ⚖️ License

Doprinošenja su podložna MIT Licenzi.

---

## Hvala! 🙏

Hvala što razmatrate doprinos! Vaš napor je cenjena i značajan je za projekat.

**Ako imate bilo koja pitanja, otvorite Issue ili Discussion!**

---

**Verzija:** 2.1  
**Poslednja Ažuriranja:** Januar 2026  
**Status:** Aktivno tražimo doprinos!