# 🌍 World Time Zones - Brzi Početak

Kako da počneš sa aplikacijom za svetsko vreme za 5 minuta.

## 1. Instalacija (2 minute)

### Opcija A: Direktno iz GitHub Pages
```
https://zzeeroo78.github.io/Portfolio/01-world-time-zones/
```
Otvori u bilo kom pretraživaču - sve je dostupno odmah!

### Opcija B: Lokalno na računaru
```bash
# 1. Kloniraj repozitorijum
git clone https://github.com/ZzeeroO78/Portfolio.git
cd Portfolio/01-world-time-zones

# 2. Pokreni lokalni server
python3 -m http.server 8000

# 3. Otvori u pretraživaču
# http://localhost:8000
```

### Opcija C: Docker
```bash
docker run -p 8000:8000 -v $(pwd):/app python:3.11 \
  bash -c "cd /app && python -m http.server 8000"
```

## 2. Osnovna Upotreba (3 minute)

### Dodaj svoj prvi grad

1. Klikni na **"+ Dodaj Grad"** dugme
2. Otkuča naziv grada (npr. "Tokyo")
3. Klikni na predloženi grad
4. Vidiš vreme u stvarnom vremenu!

### Pronađi grad

- Koristi **search box** na vrhu
- Unesi bilo koji grad/zemlja
- Automatski filtrira sve gradove

### Promeni podešavanja

1. Klikni na **"⚙️"** dugme (desno gore)
2. Izberi šta voliš:
   - **24H / 12H format** - Kako prikazati vremenske
   - **Prikaži sekunde** - Sekunde ili bez
   - **Temperatura** - Celzijus ili Farenhajt
   - **Vremenske prognoze** - Prikaži/sakrij vreme
   - **Dark Mode** - Svetla ili tamna tema

## 3. Napredne Opcije (1 minut)

### Sortiranje
Klikni **"📊 Sort"** za prebacivanje između:
- **Po imenu** - Alfabetski redosled
- **Po vremenu** - Odmah vidim druge vremenske zone

### Tastaturne Prečice
```
Cmd/Ctrl + K  → Otvori pretragu
Cmd/Ctrl + N  → Dodaj novi grad
Cmd/Ctrl + ,  → Otvori postavke
Escape        → Zatvori modal
```

### Reset na Početnu
Klikni **"Reset"** u postavkama da se vratite na 6 zadanih gradova:
- London
- New York
- Tokyo
- Paris
- Sydney
- Dubai

## 4. Napomene

### Sačuvan napredak
- ✅ Svi tvoji gradovi se čuvaju lokalno
- ✅ Sva podešavanja se čuvaju automatski
- ✅ Bez potrebe za registracijom ili login-om

### Offline rad
- ✅ Aplikacija radi i bez interneta
- ✅ Svi podaci su dostupni offline-u
- ✅ Vreme se ažurira čak i offline

### Instalacija na početnu stranicu
#### Na iOS:
1. Otvori stranicu u Safari
2. Klikni "Share" → "Add to Home Screen"
3. Otvori kao app!

#### Na Android:
1. Otvori stranicu u Chrome
2. Klikni tri tačke → "Install app"
3. Otvori kao aplikacija!

## 5. Česta Pitanja

**P: Koje gradove mogu dodati?**
A: 766+ gradova sa ispravnim vremenskim zonama. Pronađi svoj grad u bazi!

**P: Da li vreme je tačno?**
A: Da! Koristi se tvoje računarsko vreme kao osnova sa ispravnom vremenskom zonom za svaki grad.

**P: Gde se čuvaju moji gradovi?**
A: U tvom pretraživaču (localStorage), nigde na serveru. Privatnost je zagarantovana!

**P: Mogu li da koristim aplikaciju offline?**
A: Da! Aplikacija je PWA sa Service Worker-om koji omogućava offline pristup.

**P: Kako da resetujem sve?**
A: Klikni "Reset" u postavkama ili obriši cache pretraživača.

**P: Koja imena gradova mogu koristiti?**
A: Koristi engleske nazive gradova, npr. "London", "New York", "Tokyo".

## 6. Sličice Baza Gradova

| Region | Primeri Gradova |
|--------|-----------------|
| 🇬🇧 UK | London, Manchester, Edinburgh, Cardiff |
| 🇺🇸 USA | New York, Los Angeles, Chicago, Houston |
| 🇯🇵 Japan | Tokyo, Osaka, Kyoto, Yokohama |
| 🇨🇳 China | Beijing, Shanghai, Guangzhou, Chongqing |
| 🇮🇳 India | Delhi, Mumbai, Bangalore, Hyderabad |
| 🇫🇷 France | Paris, Marseille, Lyon, Nice |
| 🇩🇪 Germany | Berlin, Munich, Frankfurt, Cologne |
| 🇪🇸 Spain | Madrid, Barcelona, Valencia, Seville |
| 🇮🇹 Italy | Rome, Milan, Naples, Turin |
| 🇧🇷 Brazil | São Paulo, Rio de Janeiro, Salvador |
| 🇦🇺 Australia | Sydney, Melbourne, Brisbane, Perth |
| 🇳🇿 New Zealand | Auckland, Wellington, Christchurch |
| 🇷🇺 Russia | Moscow, St. Petersburg, Novosibirsk |
| 🌍 + 150+ Zemalja | ... i još mnogo više! |

## 7. Tehnička Podrška

Ako nešto ne radi:

1. **Obriši cache:** Ctrl+Shift+Delete (Windows) ili Cmd+Shift+Delete (Mac)
2. **Osvežavanj:** Ctrl+Shift+R (Windows) ili Cmd+Shift+R (Mac)
3. **Resetuj:** Klikni "Reset" u postavkama
4. **Preisproba:** Koristi drugačiji pretraživač

## 8. Sledeće Korake

- 📖 Čitaj [FEATURES.md](FEATURES.md) za sve funkcije
- 🔒 Provjeri [SECURITY.md](SECURITY.md) za sigurnost
- 📝 Vidi [CHANGELOG.md](CHANGELOG.md) za istoriju
- 🤝 Doprinesi na [GitHub](https://github.com/ZzeeroO78/Portfolio)

---

**Uživaj u aplikaciji! 🌍⏰**