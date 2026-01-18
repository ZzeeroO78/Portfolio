// Extended cities database
const citiesDatabase = {
    'london': 'Europe/London',
    'new york': 'America/New_York',
    'tokyo': 'Asia/Tokyo',
    'paris': 'Europe/Paris',
    'sydney': 'Australia/Sydney',
    'dubai': 'Asia/Dubai',
    'singapore': 'Asia/Singapore',
    'hong kong': 'Asia/Hong_Kong',
    'los angeles': 'America/Los_Angeles',
    'toronto': 'America/Toronto',
    'mexico city': 'America/Mexico_City',
    'sao paulo': 'America/Sao_Paulo',
    'moscow': 'Europe/Moscow',
    'istanbul': 'Europe/Istanbul',
    'bangkok': 'Asia/Bangkok',
    'mumbai': 'Asia/Kolkata',
    'shanghai': 'Asia/Shanghai',
    'auckland': 'Pacific/Auckland',
    'cairo': 'Africa/Cairo',
    'lagos': 'Africa/Lagos',
    'buenos aires': 'America/Argentina/Buenos_Aires',
    'lima': 'America/Lima',
    'vancouver': 'America/Vancouver',
    'dubai': 'Asia/Dubai',
    'chicago': 'America/Chicago',
    'denver': 'America/Denver',
    'seattle': 'America/Los_Angeles',
    'miami': 'America/New_York',
    'boston': 'America/New_York',
    'san francisco': 'America/Los_Angeles',
    'berlin': 'Europe/Berlin',
    'madrid': 'Europe/Madrid',
    'rome': 'Europe/Rome',
    'amsterdam': 'Europe/Amsterdam',
    'zurich': 'Europe/Zurich',
    'bangkok': 'Asia/Bangkok',
    'seoul': 'Asia/Seoul',
    'delhi': 'Asia/Kolkata',
    'auckland': 'Pacific/Auckland'
};

const defaultCities = [
    { name: 'London', timezone: 'Europe/London' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' }
];

let cities = [];
let sortMode = 'name'; // 'name' or 'time'
let use24HourFormat = true;
let showSeconds = true;
let useFahrenheit = false;
let darkMode = false;
let showWeather = true;

// Initialize the app
function init() {
    loadSettings();
    loadCitiesFromStorage();
    if (cities.length === 0) {
        cities = [...defaultCities];
    }
    setupEventListeners();
    renderCities();
    updateTime();
    updateHeaderTime();
    setInterval(updateTime, 1000);
    setInterval(updateHeaderTime, 1000);
    
    // Apply dark mode if enabled
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', debounce(filterCities, 300));
    document.getElementById('sortBtn').addEventListener('click', toggleSort);
    document.getElementById('add-city-btn').addEventListener('click', openAddModal);
    document.getElementById('settingsBtn').addEventListener('click', openSettingsModal);
    document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);
    document.getElementById('confirmAddBtn').addEventListener('click', addCity);
    document.getElementById('timeFormatBtn').addEventListener('click', toggleTimeFormat);
    document.getElementById('resetBtn').addEventListener('click', resetToDefault);
    document.getElementById('cityInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addCity();
    });
    document.getElementById('cityInput').addEventListener('input', showSuggestions);
    
    // Close modals
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('show');
        });
    });
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
    
    // Settings checkboxes
    document.getElementById('showWeather').addEventListener('change', (e) => {
        showWeather = e.target.checked;
        saveSettings();
        renderCities();
    });
    
    document.getElementById('showSeconds').addEventListener('change', (e) => {
        showSeconds = e.target.checked;
        saveSettings();
        updateTime();
    });
    
    document.getElementById('useF').addEventListener('change', (e) => {
        useFahrenheit = e.target.checked;
        saveSettings();
        renderCities();
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get current time for a city
function getTimeForCity(timezone) {
    const date = new Date();
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24HourFormat
    };
    let timeString = date.toLocaleString('en-US', options);
    
    if (!showSeconds) {
        timeString = timeString.split(':').slice(0, 2).join(':');
        if (!use24HourFormat) {
            const parts = timeString.split(' ');
            timeString = parts[0] + ' ' + parts[1];
        }
    }
    
    return timeString;
}

// Get header time
function updateHeaderTime() {
    const date = new Date();
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !use24HourFormat
    };
    document.getElementById('currentTime').textContent = date.toLocaleString('en-US', options);
}

// Get date for a city
function getDateForCity(timezone) {
    const date = new Date();
    const options = {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return date.toLocaleString('en-US', options);
}

// Determine if it's day or night
function isDayTime(timezone) {
    const date = new Date();
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        hour12: false
    };
    const hour = parseInt(date.toLocaleString('en-US', options));
    return hour >= 6 && hour < 18;
}

// Get weather icon and info (simulated)
function getWeatherInfo(timezone, cityName) {
    const isDaytime = isDayTime(timezone);
    const icons = {
        sunny: '☀️',
        cloudy: '☁️',
        rainy: '🌧️',
        windy: '💨',
        night: '🌙',
        snow: '❄️'
    };
    
    // Simulated weather data based on city
    const weatherData = {
        'london': { icon: icons.cloudy, temp: 12, humidity: 75 },
        'new york': { icon: icons.cloudy, temp: 15, humidity: 65 },
        'tokyo': { icon: icons.sunny, temp: 18, humidity: 60 },
        'paris': { icon: icons.rainy, temp: 14, humidity: 70 },
        'sydney': { icon: icons.sunny, temp: 28, humidity: 55 },
        'dubai': { icon: icons.sunny, temp: 35, humidity: 30 },
        'singapore': { icon: icons.rainy, temp: 32, humidity: 80 },
        'hong kong': { icon: icons.cloudy, temp: 25, humidity: 75 },
        'los angeles': { icon: icons.sunny, temp: 22, humidity: 45 },
        'toronto': { icon: icons.cloudy, temp: 10, humidity: 70 },
        'moscow': { icon: isDaytime ? icons.cloudy : icons.night, temp: -5, humidity: 80 },
        'bangkok': { icon: icons.rainy, temp: 30, humidity: 85 }
    };
    
    let data = weatherData[cityName.toLowerCase()];
    if (!data) {
        data = { 
            icon: isDaytime ? icons.sunny : icons.night, 
            temp: Math.floor(Math.random() * 25) + 10, 
            humidity: Math.floor(Math.random() * 40) + 50 
        };
    }
    
    const tempF = Math.round((data.temp * 9/5) + 32);
    const tempDisplay = useFahrenheit ? `${tempF}°F` : `${data.temp}°C`;
    
    return {
        icon: data.icon,
        temp: tempDisplay,
        humidity: data.humidity
    };
}

// Render all cities
function renderCities() {
    const grid = document.getElementById('citiesGrid');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredCities = cities.filter(city => 
        city.name.toLowerCase().includes(searchTerm)
    );

    // Sort cities
    if (sortMode === 'time') {
        filteredCities.sort((a, b) => {
            const timeA = getTimeForCity(a.timezone);
            const timeB = getTimeForCity(b.timezone);
            return timeA.localeCompare(timeB);
        });
    } else {
        filteredCities.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Update city count
    document.getElementById('cityCount').textContent = cities.length;

    if (filteredCities.length === 0) {
        grid.innerHTML = `<div class="empty-state">
            <h2>📍 No cities found</h2>
            <p>Add a city or adjust your search</p>
        </div>`;
        return;
    }

    grid.innerHTML = filteredCities.map(city => {
        const time = getTimeForCity(city.timezone);
        const date = getDateForCity(city.timezone);
        const dayTime = isDayTime(city.timezone);
        const period = dayTime ? 'day' : 'night';
        const periodText = dayTime ? '☀️ Day' : '🌙 Night';
        
        let weatherHTML = '';
        if (showWeather) {
            const weather = getWeatherInfo(city.timezone, city.name);
            weatherHTML = `
                <div class="city-weather">
                    <div class="weather-item">
                        <span class="weather-icon">${weather.icon}</span>
                        <span>${weather.temp}</span>
                    </div>
                    <div class="weather-item">
                        <span class="weather-icon">💧</span>
                        <span>${weather.humidity}% Humidity</span>
                    </div>
                </div>
            `;
        }

        return `
            <div class="city-card">
                <div class="city-header">
                    <div class="city-name">${city.name}</div>
                    <button class="remove-btn" onclick="removeCity('${city.name}')">✕</button>
                </div>
                <div class="city-time">${time}</div>
                <div class="city-timezone">${city.timezone}</div>
                <div class="city-date">${date}</div>
                ${weatherHTML}
                <span class="time-period ${period}">${periodText}</span>
            </div>
        `;
    }).join('');
}

// Update time display
function updateTime() {
    const cards = document.querySelectorAll('.city-card');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredCities = cities.filter(city => 
        city.name.toLowerCase().includes(searchTerm)
    );

    let sortedCities = [...filteredCities];
    if (sortMode === 'time') {
        sortedCities.sort((a, b) => {
            const timeA = getTimeForCity(a.timezone);
            const timeB = getTimeForCity(b.timezone);
            return timeA.localeCompare(timeB);
        });
    }

    cards.forEach((card, index) => {
        const city = sortedCities[index];
        if (city) {
            const timeElement = card.querySelector('.city-time');
            const periodElement = card.querySelector('.time-period');
            
            timeElement.textContent = getTimeForCity(city.timezone);
            const dayTime = isDayTime(city.timezone);
            const periodText = dayTime ? '☀️ Day' : '🌙 Night';
            periodElement.textContent = periodText;
            periodElement.className = `time-period ${dayTime ? 'day' : 'night'}`;
        }
    });
    
    // Update last update time
    const now = new Date();
    document.getElementById('updateTime').textContent = now.toLocaleTimeString('en-US', { hour12: false });
}

// Filter cities
function filterCities() {
    renderCities();
}

// Toggle sort
function toggleSort() {
    sortMode = sortMode === 'name' ? 'time' : 'name';
    document.getElementById('sortBtn').textContent = sortMode === 'time' 
        ? '📍 Sort by Name' 
        : '📊 Sort by Time';
    renderCities();
}

// Toggle time format
function toggleTimeFormat() {
    use24HourFormat = !use24HourFormat;
    document.getElementById('timeFormatBtn').textContent = use24HourFormat 
        ? '🕐 24H' 
        : '🕐 12H';
    saveSettings();
    updateTime();
}

// Toggle dark mode
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    saveSettings();
}

// Open add city modal
function openAddModal() {
    document.getElementById('addCityModal').classList.add('show');
    document.getElementById('cityInput').focus();
    document.getElementById('suggestions').innerHTML = '';
}

// Open settings modal
function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    document.getElementById('showWeather').checked = showWeather;
    document.getElementById('showSeconds').checked = showSeconds;
    document.getElementById('useF').checked = useFahrenheit;
    modal.classList.add('show');
}

// Show suggestions
function showSuggestions() {
    const input = document.getElementById('cityInput').value.toLowerCase().trim();
    const suggestionsDiv = document.getElementById('suggestions');
    
    if (!input) {
        suggestionsDiv.innerHTML = '';
        return;
    }
    
    const matches = Object.keys(citiesDatabase).filter(city => 
        city.includes(input) && !cities.some(c => c.name.toLowerCase() === city)
    ).slice(0, 8);
    
    if (matches.length === 0) {
        suggestionsDiv.innerHTML = '';
        return;
    }
    
    suggestionsDiv.innerHTML = matches.map(match => `
        <div class="suggestion-item" onclick="selectSuggestion('${match}')">${match}</div>
    `).join('');
}

// Select suggestion
function selectSuggestion(cityName) {
    document.getElementById('cityInput').value = cityName;
    document.getElementById('suggestions').innerHTML = '';
}

// Add city
function addCity() {
    const input = document.getElementById('cityInput');
    const cityName = input.value.trim();

    if (!cityName) {
        alert('Please enter a city name');
        return;
    }

    if (cities.some(c => c.name.toLowerCase() === cityName.toLowerCase())) {
        alert('This city is already added');
        input.value = '';
        return;
    }

    const timezone = citiesDatabase[cityName.toLowerCase()];
    
    if (timezone) {
        cities.push({ name: cityName.charAt(0).toUpperCase() + cityName.slice(1), timezone: timezone });
        saveCitiesToStorage();
        renderCities();
        input.value = '';
        document.getElementById('addCityModal').classList.remove('show');
    } else {
        alert(`Timezone for "${cityName}" not found. Try one of the major cities.`);
    }
}

// Remove city
function removeCity(cityName) {
    cities = cities.filter(city => city.name !== cityName);
    saveCitiesToStorage();
    renderCities();
}

// Reset to default cities
function resetToDefault() {
    if (confirm('Are you sure you want to reset to default cities?')) {
        cities = [...defaultCities];
        saveCitiesToStorage();
        renderCities();
    }
}

// Local storage functions
function saveCitiesToStorage() {
    localStorage.setItem('worldTimeCities', JSON.stringify(cities));
}

function loadCitiesFromStorage() {
    const stored = localStorage.getItem('worldTimeCities');
    if (stored) {
        cities = JSON.parse(stored);
    }
}

function saveSettings() {
    localStorage.setItem('worldTimeSettings', JSON.stringify({
        use24HourFormat,
        showSeconds,
        useFahrenheit,
        darkMode,
        showWeather
    }));
}

function loadSettings() {
    const stored = localStorage.getItem('worldTimeSettings');
    if (stored) {
        const settings = JSON.parse(stored);
        use24HourFormat = settings.use24HourFormat ?? true;
        showSeconds = settings.showSeconds ?? true;
        useFahrenheit = settings.useFahrenheit ?? false;
        darkMode = settings.darkMode ?? false;
        showWeather = settings.showWeather ?? true;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
