// World Time Zones - Optimized & Clean
// January 2026

// ============= GLOBAL STATE =============
let cities = [];
let use24HourFormat = true;
let showSeconds = true;
let useFahrenheit = false;
let darkMode = true;
let showWeather = true;

// Default cities
const defaultCities = [
    { name: 'London', timezone: 'Europe/London' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' }
];

// Weather API coordinates (only essential cities)
const cityCoordinates = {
    'london': { lat: 51.5074, lon: -0.1278 },
    'new york': { lat: 40.7128, lon: -74.0060 },
    'tokyo': { lat: 35.6762, lon: 139.6503 },
    'paris': { lat: 48.8566, lon: 2.3522 },
    'sydney': { lat: -33.8688, lon: 151.2093 },
    'dubai': { lat: 25.2048, lon: 55.2708 },
    'singapore': { lat: 1.3521, lon: 103.8198 },
    'hong kong': { lat: 22.3193, lon: 114.1694 },
    'los angeles': { lat: 34.0522, lon: -118.2437 },
    'toronto': { lat: 43.6532, lon: -79.3832 },
    'moscow': { lat: 55.7558, lon: 37.6173 },
    'bangkok': { lat: 13.7563, lon: 100.5018 },
    'istanbul': { lat: 41.0082, lon: 28.9784 },
    'berlin': { lat: 52.5200, lon: 13.4050 },
    'madrid': { lat: 40.4168, lon: -3.7038 },
    'rome': { lat: 41.9028, lon: 12.4964 },
    'prague': { lat: 50.0755, lon: 14.4378 },
    'warsaw': { lat: 52.2297, lon: 21.0122 },
    'budapest': { lat: 47.4979, lon: 19.0402 },
    'vienna': { lat: 48.2082, lon: 16.3738 },
    'zurich': { lat: 47.3769, lon: 8.5472 },
    'amsterdam': { lat: 52.3676, lon: 4.9041 },
    'stockholm': { lat: 59.3293, lon: 18.0686 },
    'oslo': { lat: 59.9139, lon: 10.7522 },
    'copenhagen': { lat: 55.6761, lon: 12.5683 },
    'dubai': { lat: 25.2048, lon: 55.2708 },
    'bangkok': { lat: 13.7563, lon: 100.5018 },
    'melbourne': { lat: -37.8136, lon: 144.9631 },
    'auckland': { lat: -37.7870, lon: 174.7865 }
};

// ============= INITIALIZATION =============
function init() {
    loadSettings();
    loadCitiesFromStorage();
    
    if (!cities || cities.length === 0) {
        cities = JSON.parse(JSON.stringify(defaultCities));
        saveCitiesToStorage();
    }
    
    setupEventListeners();
    renderCities();
    updateTime();
    
    // Update times every 500ms
    setInterval(updateTime, 500);
    
    // Update weather after DOM is ready
    setTimeout(() => updateWeather(), 100);
    
    // Refresh weather every 10 minutes
    setInterval(updateWeather, 600000);
}

// ============= WEATHER FUNCTIONS =============
async function updateWeather() {
    const cards = document.querySelectorAll('.city-card');
    if (cards.length === 0) return;
    
    const promises = Array.from(cards).map(async (card) => {
        const cityName = card.getAttribute('data-city-name');
        if (!cityName) return;
        
        const city = cities.find(c => c.name === cityName);
        if (!city) return;
        
        const weather = await fetchRealWeather(city.name);
        updateWeatherDisplay(card, weather, city.timezone);
    });
    
    await Promise.allSettled(promises);
}

async function fetchRealWeather(cityName) {
    const coords = cityCoordinates[cityName.toLowerCase()];
    if (!coords) return null;
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,weather_code,is_day&timezone=auto`;
    
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        
        if (!response.ok) return null;
        
        const data = await response.json();
        if (data && data.current) {
            return {
                temp: Math.round(data.current.temperature_2m),
                humidity: Math.round(data.current.relative_humidity_2m),
                weatherCode: data.current.weather_code,
                isDay: data.current.is_day
            };
        }
    } catch (e) {
        console.error(`Weather fetch failed for ${cityName}`);
    }
    return null;
}

function updateWeatherDisplay(card, weather, timezone) {
    const season = getSeason(timezone);
    
    if (weather) {
        const temp = useFahrenheit 
            ? `${Math.round((weather.temp * 9/5) + 32)}°F`
            : `${weather.temp}°C`;
        
        const tempSpan = card.querySelector('.temp-value');
        if (tempSpan) tempSpan.textContent = temp;
        
        const humiditySpan = card.querySelector('.humidity-value');
        if (humiditySpan) humiditySpan.textContent = `${weather.humidity}%`;
        
        const seasonSpan = card.querySelector('.season-value');
        if (seasonSpan) seasonSpan.textContent = season.charAt(0).toUpperCase() + season.slice(1);
    } else {
        // Fallback when API fails
        const tempSpan = card.querySelector('.temp-value');
        if (tempSpan) tempSpan.textContent = '20°C';
        
        const humiditySpan = card.querySelector('.humidity-value');
        if (humiditySpan) humiditySpan.textContent = '65%';
        
        const seasonSpan = card.querySelector('.season-value');
        if (seasonSpan) seasonSpan.textContent = season.charAt(0).toUpperCase() + season.slice(1);
    }
}

// ============= TIME & DATE FUNCTIONS =============
function updateTime() {
    const cards = document.querySelectorAll('.city-card');
    cards.forEach(card => {
        const cityName = card.getAttribute('data-city-name');
        const city = cities.find(c => c.name === cityName);
        if (!city) return;
        
        const time = getTimeForCity(city.timezone);
        const date = getDateForCity(city.timezone);
        const isDayTime = isDay(city.timezone);
        
        const timeEl = card.querySelector('.city-time');
        if (timeEl) timeEl.textContent = time;
        
        const dateEl = card.querySelector('.city-date');
        if (dateEl) dateEl.textContent = date;
        
        const periodEl = card.querySelector('.time-period');
        if (periodEl) {
            periodEl.textContent = isDayTime ? '☀️ Day' : '🌙 Night';
            periodEl.className = `time-period ${isDayTime ? 'day' : 'night'}`;
        }
    });
}

function getTimeForCity(timezone) {
    const date = new Date();
    const options = { 
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: use24HourFormat ? '2-digit' : undefined,
        hour12: !use24HourFormat
    };
    return date.toLocaleString('en-US', options);
}

function getDateForCity(timezone) {
    const date = new Date();
    const options = {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: '2-digit'
    };
    return date.toLocaleString('en-US', options);
}

function isDay(timezone) {
    const date = new Date();
    const options = { timeZone: timezone, hour: '2-digit', hour12: false };
    const hour = parseInt(date.toLocaleString('en-US', options));
    return hour >= 6 && hour < 18;
}

function getSeason(timezone) {
    const now = new Date();
    const month = now.getMonth();
    const isSouthern = timezone.includes('Australia') || timezone.includes('Pacific') || timezone.includes('Argentina');
    
    let season;
    if (isSouthern) {
        if (month >= 11 || month <= 1) season = 'summer';
        else if (month >= 2 && month <= 4) season = 'autumn';
        else if (month >= 5 && month <= 7) season = 'winter';
        else season = 'spring';
    } else {
        if (month >= 11 || month <= 1) season = 'winter';
        else if (month >= 2 && month <= 4) season = 'spring';
        else if (month >= 5 && month <= 7) season = 'summer';
        else season = 'autumn';
    }
    return season;
}

// ============= RENDERING =============
function renderCities() {
    const grid = document.getElementById('citiesGrid');
    if (!grid) return;
    
    grid.innerHTML = cities.map(city => `
        <div class="city-card" data-city-name="${city.name}">
            <div class="city-header">
                <div class="city-name">${city.name}</div>
                <button class="remove-btn" onclick="removeCity('${city.name}')">✕</button>
            </div>
            <div class="city-time">--:--</div>
            <div class="city-timezone">${city.timezone}</div>
            <div class="city-date">-- --- --</div>
            ${showWeather ? `
                <div class="city-weather">
                    <div class="weather-item">
                        <span class="weather-icon">🌡️</span>
                        <span class="temp-value">⏳</span>
                    </div>
                    <div class="weather-item">
                        <span class="weather-icon">💧</span>
                        <span class="humidity-value">⏳</span>
                    </div>
                    <div class="weather-item">
                        <span class="weather-icon">📅</span>
                        <span class="season-value">--</span>
                    </div>
                </div>
            ` : ''}
            <span class="time-period day">☀️ Day</span>
        </div>
    `).join('');
    
    updateTime();
}

// ============= EVENT LISTENERS =============
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.city-card').forEach(card => {
                const name = card.getAttribute('data-city-name').toLowerCase();
                card.style.display = name.includes(term) ? 'block' : 'none';
            });
        });
    }
    
    const weatherToggle = document.getElementById('weatherToggle');
    if (weatherToggle) {
        weatherToggle.checked = showWeather;
        weatherToggle.addEventListener('change', (e) => {
            showWeather = e.target.checked;
            saveSettings();
            renderCities();
            if (showWeather) setTimeout(() => updateWeather(), 100);
        });
    }
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.checked = darkMode;
        darkModeToggle.addEventListener('change', (e) => {
            darkMode = e.target.checked;
            document.body.classList.toggle('light-mode', !darkMode);
            saveSettings();
        });
    }
    
    const timeFormatBtn = document.getElementById('timeFormatBtn');
    if (timeFormatBtn) {
        timeFormatBtn.addEventListener('click', () => {
            use24HourFormat = !use24HourFormat;
            saveSettings();
            updateTime();
        });
    }
}

// ============= CITY MANAGEMENT =============
function addCity() {
    const input = document.getElementById('cityInput');
    if (!input) return;
    
    const cityName = input.value.trim();
    if (!cityName) return;
    
    if (!cities.some(c => c.name.toLowerCase() === cityName.toLowerCase())) {
        cities.push({
            name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
        saveCitiesToStorage();
        renderCities();
        input.value = '';
    }
}

function removeCity(cityName) {
    cities = cities.filter(c => c.name !== cityName);
    saveCitiesToStorage();
    renderCities();
}

// ============= STORAGE =============
function saveCitiesToStorage() {
    localStorage.setItem('worldTimeCities', JSON.stringify(cities));
}

function loadCitiesFromStorage() {
    const stored = localStorage.getItem('worldTimeCities');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].name) {
                cities = parsed;
                return;
            }
        } catch (e) {
            console.error('Failed to load cities');
        }
    }
    cities = [];
}

function saveSettings() {
    localStorage.setItem('worldTimeSettings', JSON.stringify({
        use24HourFormat, showSeconds, useFahrenheit, darkMode, showWeather
    }));
}

function loadSettings() {
    const stored = localStorage.getItem('worldTimeSettings');
    if (stored) {
        try {
            const settings = JSON.parse(stored);
            use24HourFormat = settings.use24HourFormat ?? true;
            showSeconds = settings.showSeconds ?? true;
            useFahrenheit = settings.useFahrenheit ?? false;
            darkMode = settings.darkMode ?? true;
            showWeather = settings.showWeather ?? true;
            
            if (!darkMode) document.body.classList.add('light-mode');
        } catch (e) {
            console.error('Failed to load settings');
        }
    }
}

// ============= START APP =============
document.addEventListener('DOMContentLoaded', init);
