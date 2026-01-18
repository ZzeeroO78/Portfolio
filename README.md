# World Time Zones Application

A beautiful, interactive web application that displays the current time in major cities around the world.

## Features

✨ **Real-time Updates**: Time updates every second for all cities
🌍 **12+ Default Cities**: Pre-loaded with major cities globally
➕ **Add Custom Cities**: Easily add your favorite cities
🔍 **Search Functionality**: Filter cities by name
📊 **Sort Options**: Sort by city name or current time
🌓 **Day/Night Indicator**: Visual indicator showing if it's day or night in each city
💾 **Persistent Storage**: Your custom cities are saved in browser storage
📱 **Responsive Design**: Works perfectly on desktop and mobile devices
🎨 **Beautiful UI**: Modern, animated interface with gradient background

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **View Times**: See current time for all default cities
3. **Search**: Use the search box to filter cities
4. **Sort**: Click "Sort by Time" to toggle between name and time sorting
5. **Add City**: Click "+ Add City" to add new cities
   - Supported major cities include: Tokyo, London, New York, Paris, Sydney, Dubai, Singapore, Hong Kong, Los Angeles, Toronto, Mexico City, São Paulo, Moscow, Istanbul, Bangkok, Mumbai, Shanghai, Auckland, Cairo, and more
6. **Remove City**: Click the ✕ button on any city card to remove it

## Supported Cities

### Default Cities
- London (Europe/London)
- New York (America/New_York)
- Tokyo (Asia/Tokyo)
- Paris (Europe/Paris)
- Sydney (Australia/Sydney)
- Dubai (Asia/Dubai)
- Singapore (Asia/Singapore)
- Hong Kong (Asia/Hong_Kong)
- Los Angeles (America/Los_Angeles)
- Toronto (America/Toronto)
- Mexico City (America/Mexico_City)
- São Paulo (America/Sao_Paulo)

### Extendable Cities
The application can be easily extended to support more cities by adding them to the `commonCities` object in `script.js`.

## Files Structure

```
world-time-app/
├── index.html      # Main HTML file with structure
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
