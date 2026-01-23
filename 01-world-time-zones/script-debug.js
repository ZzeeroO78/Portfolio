// ============================================
// World Time Zones - DEBUG VERSION
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

console.log('🔍 DEBUG: Script loaded!');
console.log('Default cities count:', defaultCities.length);

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

function getDateForCity(timezone) {
    const date = new Date();
    const options = {
        timeZone: timezone,
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

function isDayTime(timezone) {
    const date = new Date();
    const hours = parseInt(date.toLocaleString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        hour12: false
    }));
    return hours >= 6 && hours < 18;
}

function renderCities() {
    console.log('🔍 DEBUG: renderCities() pozvana');
    console.log('Cities array:', cities);
    
    const grid = document.getElementById('citiesGrid');
    console.log('Grid element:', grid);
    
    if (!grid) {
        console.error('❌ citiesGrid element NOT FOUND!');
        return;
    }

    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    const filteredCities = cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm)
    );

    console.log('Filtered cities:', filteredCities.length);

    if (filteredCities.length === 0) {
        grid.innerHTML = `<div class="empty-state"><h2>📍 No cities found</h2></div>`;
        console.warn('⚠️ No cities to render!');
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
    
    console.log('✅ Cities rendered:', filteredCities.length);
}

function updateTime() {
    const cards = document.querySelectorAll('.city-card');
    cards.forEach((card) => {
        const cityName = card.getAttribute('data-city-name');
        const city = cities.find(c => c.name === cityName);
        if (city) {
            card.querySelector('.city-time').textContent = getTimeForCity(city.timezone);
        }
    });
}

function saveCitiesToStorage() {
    localStorage.setItem('worldTimeCities', JSON.stringify(cities));
}

function loadCitiesFromStorage() {
    console.log('🔍 DEBUG: loadCitiesFromStorage() pozvana');
    const stored = localStorage.getItem('worldTimeCities');
    console.log('Stored in localStorage:', stored);
    
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                cities = parsed;
                console.log('✅ Cities loaded from storage:', cities.length);
                return;
            }
        } catch (e) {
            console.log('Storage reset');
        }
    }
    
    console.log('Loading default cities...');
    cities = JSON.parse(JSON.stringify(defaultCities));
    console.log('✅ Default cities loaded:', cities.length);
    saveCitiesToStorage();
}

function addCity() {
    const input = document.getElementById('cityInput');
    const name = input.value.trim();
    if (!name) return;

    const city = defaultCities.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (city && !cities.find(c => c.name === city.name)) {
        cities.push(city);
        saveCitiesToStorage();
        input.value = '';
        renderCities();
    }
}

function removeCity(name) {
    cities = cities.filter(c => c.name !== name);
    saveCitiesToStorage();
    renderCities();
}

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

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', renderCities);
    }

    const addBtn = document.getElementById('addCityBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addCity);
    }

    const cityInput = document.getElementById('cityInput');
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addCity();
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
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
}

function applyDarkMode() {
    if (darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function init() {
    console.log('🔍 DEBUG: init() pozvana');
    loadSettings();
    loadCitiesFromStorage();
    setupEventListeners();
    applyDarkMode();
    renderCities();

    setInterval(updateTime, 500);
    console.log('✅ Initialization complete!');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🔍 DEBUG: DOMContentLoaded fired!');
    init();
});
