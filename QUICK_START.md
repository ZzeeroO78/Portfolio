# Quick Start Guide - World Time Zones 🌍

Brz početak rada sa World Time Zones aplikacijom.

## 🚀 Online (Prepruženo - Najjednostavnije)

Samo otvori: **https://zzeeroo78.github.io/Portfolio/**

Aplikacija je odmah dostupna bez instalacije!

## 📱 Instalacija kao PWA (Aplikacija)

### Na Desktop-u (Chrome, Edge, Firefox)
1. Otvori: https://zzeeroo78.github.io/Portfolio/
2. Klikni "Install" ili "Add to desktop" (zavisi od preglednika)
3. Aplikacija se instalira kao nativna aplikacija

### Na Mobilnom (iOS)
1. Otvori u Safari: https://zzeeroo78.github.io/Portfolio/
2. Klikni Share → Add to Home Screen
3. Pojavljuje se ikona na home screenu

### Na Mobilnom (Android)
1. Otvori u Chrome: https://zzeeroo78.github.io/Portfolio/
2. Klikni meni → Install app
3. Aplikacija se pojavljuje sa ikonom

## ⌨️ Keyboard Shortcuts (Prečice)

| Prečica | Akcija |
|---------|--------|
| **Cmd+K** (Mac) / **Ctrl+K** | Fokusiraj search polje |
| **Cmd+N** (Mac) / **Ctrl+N** | Otvori "Dodaj grad" |
| **Cmd+,** (Mac) / **Ctrl+,** | Otvori Settings |
| **Enter** | Dodaj grad (iz modalnog prozora) |
| **Escape** | Zatvori modalni prozor |

## 🎯 Osnovne Akcije

### Dodavanje Grada

1. Klikni dugme **➕ Add City** ili pritisni **Cmd+N**
2. Unesi ime grada (npr. "Paris", "Tokyo", "Sarajevo")
3. Vidi preporuke dok tipkuješ
4. Klikni na preporuku ili pritisni **Enter**

### Pretraga Gradova

1. Klikni na search polje ili pritisni **Cmd+K**
2. Počni tipkati ime grada
3. Gradovi se filtriraju u realnom vremenu
4. Rezultati se ažuriraju sami

### Sortiranje

Klikni **📊 Sort** za promjenu između:
- **Po alfabeti** (A-Z)
- **Po vremenu** (UTC offset)

### Vremenski Format

Klikni **🕐 24H** (ili 🕐 12H) da promijeniš format vremena između 24-satnog i 12-satnog.

### Dark Mode

Klikni na **🌙** gumb u navigaciji da uključiš/isključiš dark mode.

## ⚙️ Postavke (Settings)

Klikni **⚙️** u navigaciji za:
- ✓ Prikaži vremenski status (Day/Night)
- ✓ Prikaži vremenske informacije (temperatura, vlaga)
- ✓ Prikaži sekunde u vremenu
- ✓ Koristi Fahrenheit umjesto Celsius-a

## 📊 Dostupni Gradovi

Aplikacija ima **766 jedinstvenih gradova** uključujući:
- 🇧🇦 Sarajevo, Mostar, Banja Luka, Tuzla, Zenica...
- 🇬🇧 London, Manchester, Liverpool...
- 🇺🇸 New York, Los Angeles, Chicago...
- 🇯🇵 Tokyo, Osaka, Kyoto...
- 🌏 ...i 700+ drugih gradova

Kompletan popis dostupan je u `script.js` datoteci.

## 💾 Čuvanje Podataka

Sve postavke i dodani gradovi se **automatski čuvaju** u lokalnoj memoriji preglednika.

### Što se čuva:
- Lista gradova
- Vremenske postavke (12/24h format)
- Dark mode postavka
- Prikaz sekundi
- Temperaturna skala (C/F)

### Gdje se čuva:
- U local storage preglednika
- Nema slanja na server
- Nema slanja podataka nigdje

## 🌙 Korištenje u Offline Režimu

Aplikacija radi i **bez interneta** zahvaljujući Service Workeru:

1. Otvorite stranicu online jednom
2. Service Worker će cachirati datoteke
3. Zatim možete koristiti offline (samo bez vremenske provjere)
4. Gradovi i postavke se čuvaju lokalunoGrady gradovi ostaju dostupni

## 🔧 Lokalni Razvoj (Za Developere)

### Prerequisite
- Python 3+
- Git
- Tekst editor (VS Code preporučen)

### Setup
```bash
# Clone repository
git clone https://github.com/ZzeeroO78/Portfolio.git
cd world-time-app

# Start local server
python3 -m http.server 8000

# Open in browser
# http://localhost:8000
```

### File Structure
```
├── index.html          # Main HTML
├── styles.css          # Styling
├── script.js           # App logic (766 gradova)
├── manifest.json       # PWA config
├── sw.js              # Service Worker
├── updater.js         # Update notifier
└── documentation...
```

## 🐛 Troubleshooting

### Grad nije pronađen pri dodavanju
- Pokušaj sa različitim imenom (npr. "paris" umjesto "Paris")
- Mogućnost je da grad nije u bazi (ima 766 gradova, ali ne sve)
- Otkrij preporuke dok tipkuješ

### Vremenske informacije nisu točne
- Provjerite da je vrijeme na uređaju točno
- Aplikacija koristi sistemsko vrijeme
- Nema konekcije s vanjskim vremenske serverima

### Postavke se ne čuvaju
- Provjerite je li localStorage omogućen u pregledniku
- Nema privatnog/incognito moda (brisanje podataka pri zatvore)
- Provjerite dostupnost memorije na uređaju

### Service Worker se ne učitava
- Potrebna je HTTPS konekcija (ili localhost)
- Aplikacija radi i bez Service Workera (online)
- Može trebati osvježavanje stranice (Cmd+Shift+R)

### Dark mode nije uključen
- Klikni **🌙** gumb u navigaciji
- Postavka se čuva i ostaje aktivna
- Probaj osvježiti stranicu ako se ne primjeni

## 📞 Podrška

- 📖 Pogledaj [README.md](README.md) za detalje
- 🔒 Security info u [SECURITY.md](SECURITY.md)
- 🤝 Spremi li doprinos? Pogledaj [CONTRIBUTING.md](CONTRIBUTING.md)
- 📋 Verzije u [CHANGELOG.md](CHANGELOG.md)

## 🌟 Savjeti & Trikovi

1. **Brza pretraga**: Pritisni **Cmd+K** (Mac) ili **Ctrl+K** (Windows/Linux)
2. **Brzo dodaj grad**: Pritisni **Cmd+N** za brzo dodavanje
3. **Instalacija**: Instaliraj kao PWA za bržu dostupnost
4. **Dark mode**: Uključi za rad u noći
5. **Sekundin prikaz**: Isključi ako te smetaju česte ažuriranja

## 📱 Kompatibilnost Preglednika

| Preglednih | Podrška | PWA |
|-----------|---------|-----|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Edge | ✅ | ✅ |
| Mobile Chrome | ✅ | ✅ |
| Mobile Safari | ✅ | ✅ |

## 🎉 Uživaj!

World Time Zones je besplatna, brza i privatna aplikacija za praćenje vremena oko svijeta.

Nema reklama, nema praćenja, nema komplikacija - samo čisto vrijeme! ⏰

---

**Zadnje ažuriranje**: 18. siječnja 2026
**Verzija**: 2.1
**Gradovi**: 766+
