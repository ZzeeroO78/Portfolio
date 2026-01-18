# 🌍 World Time Zones

A modern, responsive web application for tracking current time in major cities worldwide with real-time updates, dark mode, weather information, and advanced filtering capabilities.

**[✨ Live Demo - Click Here to Visit!](https://zzeeroo78.github.io/Portfolio/)**

## ⭐ Features

✨ **Real-time Updates** - Time updates every second for all cities  
🌍 **40+ Cities** - Pre-loaded with major cities globally  
➕ **Custom Cities** - Easily add your favorite cities  
🔍 **Smart Search** - Filter cities with autocomplete suggestions  
📊 **Flexible Sorting** - Sort by city name or current time  
🌓 **Day/Night Indicator** - Visual indicator showing if it's day or night  
🌦️ **Weather Info** - Simulated weather with temperature and humidity  
💾 **Auto-Save** - Your custom cities and settings are saved automatically  
📱 **Responsive Design** - Perfect on desktop, tablet, and mobile  
🎨 **Dark Mode** - Beautiful light and dark themes  
⚙️ **Customizable** - Toggle 12/24 hour format, Celsius/Fahrenheit, and more


## 🚀 Quick Start

### Open Online
Visit the live demo: **https://zzeeroo78.github.io/Portfolio/**

### Run Locally

```bash
# Clone the repository
git clone https://github.com/ZzeeroO78/Portfolio.git
cd Portfolio

# Start a local server (choose one)
python3 -m http.server 8000          # Python
npx http-server                       # Node.js
php -S localhost:8000                # PHP

# Open in browser
open http://localhost:8000
```

## 🌐 Supported Cities

**40+ Cities Including:**

| Region | Cities |
|--------|--------|
| **Europe** | London, Paris, Berlin, Madrid, Rome, Amsterdam, Zurich, Istanbul, Moscow |
| **Asia** | Tokyo, Dubai, Singapore, Hong Kong, Bangkok, Mumbai, Shanghai, Seoul, Delhi |
| **Americas** | New York, Los Angeles, Toronto, Mexico City, São Paulo, Buenos Aires, Lima, Vancouver |
| **Africa & Oceania** | Cairo, Lagos, Sydney, Auckland |

## ⚙️ Customization

All settings are automatically saved to your browser:

| Setting | Options |
|---------|---------|
| **Time Format** | 12-hour (AM/PM) or 24-hour |
| **Seconds** | Show or hide seconds |
| **Temperature** | Celsius (°C) or Fahrenheit (°F) |
| **Weather** | Show or hide weather info |
| **Theme** | Light or dark mode |

## 📁 Project Structure

```
Portfolio/
├── index.html          # HTML5 structure with semantic markup
├── styles.css          # CSS3 with dark mode and animations
├── script.js           # Vanilla JavaScript (ES6+)
├── README.md           # Documentation
├── robots.txt          # SEO optimization
├── sitemap.xml         # Site structure
└── .gitignore          # Git configuration
```

## 🛠️ Technology Stack

- **HTML5** - Semantic markup with accessibility
- **CSS3** - Modern styling with CSS variables, animations, media queries
- **JavaScript ES6+** - No frameworks, pure vanilla JS
- **Font Awesome 6.4** - Icon library via CDN
- **GitHub Pages** - Free static hosting

## 📊 Performance

- **Load Time:** < 500ms
- **Time to Interactive:** < 1s
- **File Size:** ~40KB (unminified)
- **No Dependencies:** Zero npm packages
- **Mobile Optimized:** Responsive design with touch support

## 🎯 How to Use

1. **View Times** - All default cities display current time and weather
2. **Search Cities** - Type in search box to find specific cities
3. **Sort** - Click "Sort by Time" to reorganize cities
4. **Add City** - Click "+ Add City" and select from suggestions
5. **Remove City** - Click ✕ on any card
6. **Customize** - Use settings icon for theme and format options
7. **Reset** - Restore default cities anytime

## 🌙 Dark Mode

The app automatically detects your system theme preference and includes a manual toggle button in the navigation bar.

## 💾 Data Storage

All data is stored locally in your browser using localStorage:
- **worldTimeCities** - Your custom city list
- **worldTimeSettings** - Your preferences

Your data is never sent to any server.

## 🔧 Customization Guide

### Add New Cities

Edit `script.js` and update the `citiesDatabase` object:

```javascript
citiesDatabase = {
    'your-city': 'Continent/City_Name',
    // Use IANA timezone names from:
    // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
}
```

### Change Default Cities

Modify the `defaultCities` array in `script.js`:

```javascript
const defaultCities = [
    { name: 'Your City', timezone: 'Continent/City' },
    { name: 'Another City', timezone: 'Continent/Another_City' }
];
```

### Customize Weather

Edit the `getWeatherInfo()` function to change weather data for specific cities.

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge | ✅ 90+ |
| Firefox | ✅ 88+ |
| Safari | ✅ 14+ |
| Mobile Browsers | ✅ iOS Safari, Chrome Mobile |

## 📈 Future Enhancements

- [ ] Real weather API integration
- [ ] Timezone offset calculator
- [ ] Meeting scheduler across timezones
- [ ] PWA with offline support
- [ ] Time conversion tool
- [ ] Calendar with timezone awareness
- [ ] Multiple themes
- [ ] Cloud sync with user accounts

## 🤝 Contributing

Found a bug or have suggestions? 
[Open an issue](https://github.com/ZzeeroO78/Portfolio/issues) on GitHub!

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Emin Sadikovic**  
GitHub: [@ZzeeroO78](https://github.com/ZzeeroO78)

---

**[🌍 Live Demo](https://zzeeroo78.github.io/Portfolio/)** | **[GitHub Repository](https://github.com/ZzeeroO78/Portfolio)**

Made with ❤️ for global time tracking | Last Updated: January 2026
├── styles.css      # CSS styling and animations
├── script.js       # JavaScript logic and functionality
└── README.md       # This file
```

## Technical Details

- **Pure JavaScript**: No external frameworks or libraries
- **CSS Animations**: Smooth transitions and visual effects
- **Local Storage**: Cities are saved in browser's localStorage
- **Timezone Support**: Uses JavaScript's Intl API for accurate timezone handling
- **Responsive Grid**: Dynamic grid layout that adapts to screen size

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Future Enhancements

- [ ] Weather information integration
- [ ] Sunrise/sunset times
- [ ] More timezone options
- [ ] Dark mode
- [ ] World map visualization
- [ ] Time zone converter
- [ ] Alarms/reminders

## License

Free to use and modify for personal or commercial projects.
