// ============================================
// World Time Zones - CLEAN VERSION (Time Only)
// ============================================

let cities = [];
let use24HourFormat = true;
let showSeconds = true;
let darkMode = false;

const defaultCities = [
    { name: 'London', timezone: 'Europe/London' },
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { name: 'Toronto', timezone: 'America/Toronto' },
    { name: 'Moscow', timezone: 'Europe/Moscow' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok' },
    { name: 'Mexico City', timezone: 'America/Mexico_City' },
    { name: 'Sao Paulo', timezone: 'America/Sao_Paulo' },
    { name: 'Auckland', timezone: 'Pacific/Auckland' },
    { name: 'Cairo', timezone: 'Africa/Cairo' },
    { name: 'Lagos', timezone: 'Africa/Lagos' },
    { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires' },
    { name: 'Lima', timezone: 'America/Lima' },
    { name: 'Vancouver', timezone: 'America/Vancouver' }
];

// Get time for a specific timezone
function getTimeForCity(timezone) {
    const date = new Date();
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined,
        hour12: !use24HourFormat
    };
    return date.toLocaleString('en-US', options);
}

// Get date for a specific timezone
function getDateForCity(timezone) {
    const date = new Date();
    const options = {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    };
    return date.toLocaleString('en-US', options);
}

// Check if it's daytime
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

// Render all cities
function renderCities() {
    const grid = document.getElementById('citiesGrid');
    if (!grid) return;

    // Update city count
    const cityCountElement = document.getElementById('cityCount');
    if (cityCountElement) {
        cityCountElement.textContent = cities.length;
    }

    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm)
    );

    if (filteredCities.length === 0) {
        grid.innerHTML = `<div class="empty-state"><h2>📍 No cities found</h2></div>`;
        return;
    }

    grid.innerHTML = filteredCities.map(city => {
        const time = getTimeForCity(city.timezone);
        const date = getDateForCity(city.timezone);
        const dayTime = isDayTime(city.timezone);
        const periodText = dayTime ? '☀️ Day' : '🌙 Night';

        return `
            <div class="city-card" data-city-name="${city.name}">
                <div class="city-header">
                    <div class="city-name">${city.name}</div>
                    <button class="remove-btn" onclick="removeCity('${city.name}')">✕</button>
                </div>
                <div class="city-time">${time}</div>
                <div class="city-timezone">${city.timezone}</div>
                <div class="city-date">${date}</div>
                <span class="time-period ${dayTime ? 'day' : 'night'}">${periodText}</span>
            </div>
        `;
    }).join('');
}

// Update time display
function updateTime() {
    const cards = document.querySelectorAll('.city-card');
    cards.forEach((card) => {
        const cityName = card.querySelector('.city-name');
        if (!cityName) return;

        const name = cityName.textContent.trim();
        const city = cities.find(c => c.name === name);
        if (!city) return;

        const timeElement = card.querySelector('.city-time');
        if (timeElement) {
            timeElement.textContent = getTimeForCity(city.timezone);
        }

        const dateElement = card.querySelector('.city-date');
        if (dateElement) {
            dateElement.textContent = getDateForCity(city.timezone);
        }

        const periodElement = card.querySelector('.time-period');
        if (periodElement) {
            const isDayTime = true;
            const hour = new Date().toLocaleString('en-US', {
                timeZone: city.timezone,
                hour: '2-digit',
                hour12: false
            });
            const isDay = parseInt(hour) >= 6 && parseInt(hour) < 18;
            periodElement.className = `time-period ${isDay ? 'day' : 'night'}`;
            periodElement.textContent = isDay ? '☀️ Day' : '🌙 Night';
        }
    });
}

// Add new city
function addCity() {
    const input = document.getElementById('cityInput');
    if (!input) return;

    const cityName = input.value.trim();
    if (!cityName) return;

    const cityExists = cities.some(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (cityExists) {
        alert('City already added');
        return;
    }

    // Try to find in default cities
    const found = defaultCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (found) {
        cities.push(found);
        input.value = '';
        saveCitiesToStorage();
        renderCities();
        return;
    }

    alert('City not found in default list');
}

// Remove city
function removeCity(cityName) {
    cities = cities.filter(c => c.name !== cityName);
    saveCitiesToStorage();
    renderCities();
}

// Storage functions
function saveCitiesToStorage() {
    localStorage.setItem('worldTimeCities', JSON.stringify(cities));
}

function loadCitiesFromStorage() {
    const stored = localStorage.getItem('worldTimeCities');
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                cities = parsed;
                return;
            }
        } catch (e) {
            console.log('Storage reset');
        }
    }
    cities = JSON.parse(JSON.stringify(defaultCities));
    saveCitiesToStorage();
}

// Settings
function saveSettings() {
    localStorage.setItem('worldTimeSettings', JSON.stringify({
        use24HourFormat,
        showSeconds,
        darkMode
    }));
}

function loadSettings() {
    const stored = localStorage.getItem('worldTimeSettings');
    if (stored) {
        try {
            const settings = JSON.parse(stored);
            use24HourFormat = settings.use24HourFormat ?? true;
            showSeconds = settings.showSeconds ?? true;
            darkMode = settings.darkMode ?? false;
        } catch (e) {
            console.log('Settings reset');
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', renderCities);
    }

    // Add City Modal - Open button
    const addBtn = document.getElementById('addCityBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const modal = document.getElementById('cityModal');
            if (modal) {
                modal.classList.add('show');
                const cityInput = document.getElementById('cityInput');
                if (cityInput) cityInput.focus();
            }
        });
    }

    // Add City Modal - Confirm button
    const confirmBtn = document.getElementById('confirmBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            addCity();
            const modal = document.getElementById('cityModal');
            if (modal) {
                modal.classList.remove('show');
            }
        });
    }

    // Settings Modal
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            const modal = document.getElementById('settingsModal');
            if (modal) {
                modal.classList.add('show');
            }
        });
    }

    // Close buttons
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('show');
            }
        });
    });

    const cityInput = document.getElementById('cityInput');
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addCity();
                const modal = document.getElementById('cityModal');
                if (modal) {
                    modal.classList.remove('show');
                }
            }
        });
    }

    const format24Checkbox = document.getElementById('format24Hour');
    if (format24Checkbox) {
        format24Checkbox.addEventListener('change', (e) => {
            use24HourFormat = e.target.checked;
            saveSettings();
            renderCities();
        });
    }

    const showSecondsCheckbox = document.getElementById('showSeconds');
    if (showSecondsCheckbox) {
        showSecondsCheckbox.addEventListener('change', (e) => {
            showSeconds = e.target.checked;
            saveSettings();
            renderCities();
        });
    }

    const darkModeCheckbox = document.getElementById('darkMode');
    if (darkModeCheckbox) {
        darkModeCheckbox.addEventListener('change', (e) => {
            darkMode = e.target.checked;
            saveSettings();
            applyDarkMode();
            renderCities();
        });
    }

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Reset to default cities?')) {
                cities = JSON.parse(JSON.stringify(defaultCities));
                saveCitiesToStorage();
                renderCities();
                const modal = document.getElementById('settingsModal');
                if (modal) {
                    modal.classList.remove('show');
                }
            }
        });
    }

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
}

// Apply dark mode
function applyDarkMode() {
    if (darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Initialize
function init() {
    loadSettings();
    loadCitiesFromStorage();
    setupEventListeners();
    applyDarkMode();
    renderCities();

    // Update time every 500ms
    setInterval(updateTime, 500);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
