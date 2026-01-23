// ============================================
// World Time Zones - OPTIMIZED VERSION v9.0
// ============================================

// State Management
const state = {
    cities: [],
    use24HourFormat: true,
    showSeconds: true,
    darkMode: false,
    sortBy: 'default', // default, alphabetical, timezone
    searchTerm: '',
    lastUpdateTime: 0
};

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

// ========== UTILITY FUNCTIONS ==========

// Toast notification system
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Debounce helper for search
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Get time for city
function getTimeForCity(timezone) {
    const date = new Date();
    const options = {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: state.showSeconds ? '2-digit' : undefined,
        hour12: !state.use24HourFormat
    };
    return date.toLocaleString('en-US', options);
}

// Get date for city
function getDateForCity(timezone) {
    const date = new Date();
    const options = {
        timeZone: timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
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

// Get GMT offset
function getGMTOffset(timezone) {
    const date = new Date();
    const utcTime = date.toLocaleString('en-US', { timeZone: 'UTC' });
    const localTime = date.toLocaleString('en-US', { timeZone: timezone });
    
    const utcDate = new Date(utcTime);
    const localDate = new Date(localTime);
    const diff = (localDate - utcDate) / (1000 * 60 * 60);
    
    const sign = diff >= 0 ? '+' : '';
    return `GMT${sign}${diff % 1 === 0 ? diff : diff.toFixed(1)}`;
}

// Copy to clipboard
function copyToClipboard(text, cityName) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`⏱️ Time for ${cityName} copied!`, 'success', 2000);
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
}

// ========== CITY MANAGEMENT ==========

// Sort cities based on current sort mode
function getSortedCities(citiesToSort) {
    const sorted = [...citiesToSort];
    
    switch(state.sortBy) {
        case 'alphabetical':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'timezone':
            return sorted.sort((a, b) => a.timezone.localeCompare(b.timezone));
        default:
            return sorted;
    }
}

// Render all cities
function renderCities() {
    const grid = document.getElementById('citiesGrid');
    if (!grid) return;

    // Update city count
    const cityCountElement = document.getElementById('cityCount');
    if (cityCountElement) {
        cityCountElement.textContent = state.cities.length;
    }

    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    const filteredCities = state.cities.filter(city =>
        city.name.toLowerCase().includes(searchTerm)
    );

    const sortedCities = getSortedCities(filteredCities);

    if (sortedCities.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h2>📍 No cities found</h2>
                <p>Try searching for a different city or add one from the list</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = sortedCities.map(city => {
        const time = getTimeForCity(city.timezone);
        const date = getDateForCity(city.timezone);
        const dayTime = isDayTime(city.timezone);
        const periodText = dayTime ? '☀️ Day' : '🌙 Night';
        const gmt = getGMTOffset(city.timezone);

        return `
            <div class="city-card" data-city-name="${city.name}">
                <div class="city-header">
                    <div class="city-info">
                        <div class="city-name">${city.name}</div>
                        <div class="city-gmt">${gmt}</div>
                    </div>
                    <button class="remove-btn" onclick="removeCity('${city.name}')" 
                            aria-label="Remove ${city.name}" title="Remove ${city.name}">✕</button>
                </div>
                <div class="city-time" title="Click to copy" style="cursor: pointer;" 
                     onclick="copyToClipboard('${time}', '${city.name}')">${time}</div>
                <div class="city-timezone">${city.timezone}</div>
                <div class="city-date">${date}</div>
                <span class="time-period ${dayTime ? 'day' : 'night'}">${periodText}</span>
            </div>
        `;
    }).join('');
}

// Update time display efficiently
function updateTime() {
    const now = Date.now();
    if (now - state.lastUpdateTime < 490) return; // Skip if less than 490ms
    
    state.lastUpdateTime = now;
    
    const cards = document.querySelectorAll('.city-card');
    cards.forEach((card) => {
        const cityName = card.querySelector('.city-name')?.textContent.trim();
        if (!cityName) return;

        const city = state.cities.find(c => c.name === cityName);
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
            const hour = parseInt(new Date().toLocaleString('en-US', {
                timeZone: city.timezone,
                hour: '2-digit',
                hour12: false
            }));
            const isDay = hour >= 6 && hour < 18;
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
    if (!cityName) {
        showToast('Please enter a city name', 'warning');
        return;
    }

    const cityExists = state.cities.some(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (cityExists) {
        showToast(`${cityName} is already added`, 'warning');
        return;
    }

    const found = defaultCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (found) {
        state.cities.push({ ...found });
        input.value = '';
        saveCitiesToStorage();
        renderCities();
        showToast(`✅ Added ${found.name}!`, 'success');
        
        // Close modal
        const modal = document.getElementById('cityModal');
        if (modal) modal.classList.remove('show');
        return;
    }

    showToast('City not found in default list', 'error');
}

// Remove city
function removeCity(cityName) {
    if (!confirm(`Remove ${cityName}?`)) return;
    
    state.cities = state.cities.filter(c => c.name !== cityName);
    saveCitiesToStorage();
    renderCities();
    showToast(`Removed ${cityName}`, 'info');
}

// ========== STORAGE ==========

function saveCitiesToStorage() {
    try {
        localStorage.setItem('worldTimeCities', JSON.stringify(state.cities));
    } catch (e) {
        showToast('Failed to save cities', 'error');
    }
}

function loadCitiesFromStorage() {
    try {
        const stored = localStorage.getItem('worldTimeCities');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                state.cities = parsed;
                return;
            }
        }
    } catch (e) {
        // Silent catch
    }
    state.cities = JSON.parse(JSON.stringify(defaultCities));
    saveCitiesToStorage();
}

function saveSettings() {
    try {
        localStorage.setItem('worldTimeSettings', JSON.stringify({
            use24HourFormat: state.use24HourFormat,
            showSeconds: state.showSeconds,
            darkMode: state.darkMode,
            sortBy: state.sortBy
        }));
    } catch (e) {
        showToast('Failed to save settings', 'error');
    }
}

function loadSettings() {
    try {
        const stored = localStorage.getItem('worldTimeSettings');
        if (stored) {
            const settings = JSON.parse(stored);
            state.use24HourFormat = settings.use24HourFormat ?? true;
            state.showSeconds = settings.showSeconds ?? true;
            state.darkMode = settings.darkMode ?? false;
            state.sortBy = settings.sortBy ?? 'default';
        }
    } catch (e) {
        // Silent catch
    }
}

// ========== EVENT LISTENERS ==========

function setupEventListeners() {
    // Search with debounce
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        const debouncedRender = debounce(renderCities, 150);
        searchInput.addEventListener('input', debouncedRender);
    }

    // Add City Modal - Open
    const addBtn = document.getElementById('addCityBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const modal = document.getElementById('cityModal');
            if (modal) {
                modal.classList.add('show');
                const cityInput = document.getElementById('cityInput');
                if (cityInput) {
                    cityInput.value = '';
                    cityInput.focus();
                }
            }
        });
    }

    // Add City Modal - Confirm
    const confirmBtn = document.getElementById('confirmBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', addCity);
    }

    // Settings Modal - Open
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            const modal = document.getElementById('settingsModal');
            if (modal) modal.classList.add('show');
        });
    }

    // Close buttons
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) modal.classList.remove('show');
        });
    });

    // City input - Enter key
    const cityInput = document.getElementById('cityInput');
    if (cityInput) {
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addCity();
            }
        });
    }

    // Format 24-hour checkbox
    const format24Checkbox = document.getElementById('format24Hour');
    if (format24Checkbox) {
        format24Checkbox.checked = state.use24HourFormat;
        format24Checkbox.addEventListener('change', (e) => {
            state.use24HourFormat = e.target.checked;
            saveSettings();
            renderCities();
        });
    }

    // Show seconds checkbox
    const showSecondsCheckbox = document.getElementById('showSeconds');
    if (showSecondsCheckbox) {
        showSecondsCheckbox.checked = state.showSeconds;
        showSecondsCheckbox.addEventListener('change', (e) => {
            state.showSeconds = e.target.checked;
            saveSettings();
            renderCities();
        });
    }

    // Dark mode checkbox
    const darkModeCheckbox = document.getElementById('darkMode');
    if (darkModeCheckbox) {
        darkModeCheckbox.checked = state.darkMode;
        darkModeCheckbox.addEventListener('change', (e) => {
            state.darkMode = e.target.checked;
            saveSettings();
            applyDarkMode();
        });
    }

    // Sort buttons
    const sortButtons = document.querySelectorAll('[data-sort]');
    sortButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            state.sortBy = e.target.dataset.sort;
            saveSettings();
            renderCities();
            
            // Update active button
            sortButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Reset to default 20 cities?')) {
                state.cities = JSON.parse(JSON.stringify(defaultCities));
                saveCitiesToStorage();
                renderCities();
                showToast('Reset to defaults', 'info');
                const modal = document.getElementById('settingsModal');
                if (modal) modal.classList.remove('show');
            }
        });
    }

    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });

    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
            });
        }
    });

    // Dark mode toggle button
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            state.darkMode = !state.darkMode;
            saveSettings();
            applyDarkMode();
            const checkbox = document.getElementById('darkMode');
            if (checkbox) checkbox.checked = state.darkMode;
        });
    }
}

// ========== THEME ==========

function applyDarkMode() {
    if (state.darkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// ========== INITIALIZATION ==========

function init() {
    loadSettings();
    loadCitiesFromStorage();
    
    // Apply theme before render to avoid flash
    applyDarkMode();
    
    setupEventListeners();
    renderCities();

    // Update time every 500ms
    setInterval(updateTime, 500);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
