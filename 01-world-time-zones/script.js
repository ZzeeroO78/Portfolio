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
    // Europe (20 cities)
    { name: 'London', timezone: 'Europe/London' },
    { name: 'Paris', timezone: 'Europe/Paris' },
    { name: 'Berlin', timezone: 'Europe/Berlin' },
    { name: 'Madrid', timezone: 'Europe/Madrid' },
    { name: 'Rome', timezone: 'Europe/Rome' },
    { name: 'Amsterdam', timezone: 'Europe/Amsterdam' },
    { name: 'Brussels', timezone: 'Europe/Brussels' },
    { name: 'Vienna', timezone: 'Europe/Vienna' },
    { name: 'Prague', timezone: 'Europe/Prague' },
    { name: 'Budapest', timezone: 'Europe/Budapest' },
    { name: 'Warsaw', timezone: 'Europe/Warsaw' },
    { name: 'Moscow', timezone: 'Europe/Moscow' },
    { name: 'Istanbul', timezone: 'Europe/Istanbul' },
    { name: 'Athens', timezone: 'Europe/Athens' },
    { name: 'Dublin', timezone: 'Europe/Dublin' },
    { name: 'Stockholm', timezone: 'Europe/Stockholm' },
    { name: 'Copenhagen', timezone: 'Europe/Copenhagen' },
    { name: 'Zurich', timezone: 'Europe/Zurich' },
    { name: 'Geneva', timezone: 'Europe/Zurich' },
    { name: 'Lisbon', timezone: 'Europe/Lisbon' },
    
    // Asia (20 cities)
    { name: 'Tokyo', timezone: 'Asia/Tokyo' },
    { name: 'Beijing', timezone: 'Asia/Shanghai' },
    { name: 'Shanghai', timezone: 'Asia/Shanghai' },
    { name: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
    { name: 'Singapore', timezone: 'Asia/Singapore' },
    { name: 'Bangkok', timezone: 'Asia/Bangkok' },
    { name: 'Ho Chi Minh City', timezone: 'Asia/Ho_Chi_Minh' },
    { name: 'Manila', timezone: 'Asia/Manila' },
    { name: 'Seoul', timezone: 'Asia/Seoul' },
    { name: 'Delhi', timezone: 'Asia/Kolkata' },
    { name: 'Mumbai', timezone: 'Asia/Kolkata' },
    { name: 'Bangalore', timezone: 'Asia/Kolkata' },
    { name: 'Dubai', timezone: 'Asia/Dubai' },
    { name: 'Abu Dhabi', timezone: 'Asia/Dubai' },
    { name: 'Doha', timezone: 'Asia/Qatar' },
    { name: 'Riyadh', timezone: 'Asia/Riyadh' },
    { name: 'Tel Aviv', timezone: 'Asia/Jerusalem' },
    { name: 'Kuala Lumpur', timezone: 'Asia/Kuala_Lumpur' },
    { name: 'Jakarta', timezone: 'Asia/Jakarta' },
    { name: 'Karachi', timezone: 'Asia/Karachi' },
    
    // Americas (17 cities)
    { name: 'New York', timezone: 'America/New_York' },
    { name: 'Los Angeles', timezone: 'America/Los_Angeles' },
    { name: 'Chicago', timezone: 'America/Chicago' },
    { name: 'Denver', timezone: 'America/Denver' },
    { name: 'Toronto', timezone: 'America/Toronto' },
    { name: 'Vancouver', timezone: 'America/Vancouver' },
    { name: 'Mexico City', timezone: 'America/Mexico_City' },
    { name: 'Sao Paulo', timezone: 'America/Sao_Paulo' },
    { name: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires' },
    { name: 'Lima', timezone: 'America/Lima' },
    { name: 'Bogota', timezone: 'America/Bogota' },
    { name: 'Caracas', timezone: 'America/Caracas' },
    { name: 'Santiago', timezone: 'America/Santiago' },
    { name: 'Houston', timezone: 'America/Chicago' },
    { name: 'Miami', timezone: 'America/New_York' },
    { name: 'Seattle', timezone: 'America/Los_Angeles' },
    { name: 'San Francisco', timezone: 'America/Los_Angeles' },
    
    // Africa (8 cities)
    { name: 'Cairo', timezone: 'Africa/Cairo' },
    { name: 'Lagos', timezone: 'Africa/Lagos' },
    { name: 'Johannesburg', timezone: 'Africa/Johannesburg' },
    { name: 'Nairobi', timezone: 'Africa/Nairobi' },
    { name: 'Casablanca', timezone: 'Africa/Casablanca' },
    { name: 'Algiers', timezone: 'Africa/Algiers' },
    { name: 'Dakar', timezone: 'Africa/Dakar' },
    { name: 'Accra', timezone: 'Africa/Accra' },
    
    // Oceania (6 cities)
    { name: 'Sydney', timezone: 'Australia/Sydney' },
    { name: 'Melbourne', timezone: 'Australia/Melbourne' },
    { name: 'Brisbane', timezone: 'Australia/Brisbane' },
    { name: 'Perth', timezone: 'Australia/Perth' },
    { name: 'Auckland', timezone: 'Pacific/Auckland' },
    { name: 'Fiji', timezone: 'Pacific/Fiji' }
];

// ========== UTILITY FUNCTIONS ==========

// Show suggestions dropdown
function showSuggestions(input) {
    const suggestionsContainer = document.getElementById('suggestions');
    if (!suggestionsContainer) return;
    
    const searchTerm = input.value.toLowerCase().trim();
    
    if (searchTerm.length === 0) {
        suggestionsContainer.innerHTML = '';
        return;
    }
    
    // Filter available cities (not already added)
    const suggestions = defaultCities.filter(city => 
        city.name.toLowerCase().includes(searchTerm) &&
        !state.cities.some(c => c.name === city.name)
    ).slice(0, 8); // Show max 8 suggestions
    
    if (suggestions.length === 0) {
        suggestionsContainer.innerHTML = '<div class="suggestion-item disabled">No cities found</div>';
        return;
    }
    
    suggestionsContainer.innerHTML = suggestions.map(city => `
        <div class="suggestion-item" onclick="selectCity('${city.name}')">
            <div class="suggestion-name">${city.name}</div>
            <div class="suggestion-zone">${city.timezone}</div>
        </div>
    `).join('');
}

// Select city from suggestions
function selectCity(cityName) {
    const input = document.getElementById('cityInput');
    if (input) input.value = cityName;
    
    const suggestionsContainer = document.getElementById('suggestions');
    if (suggestionsContainer) suggestionsContainer.innerHTML = '';
    
    // Auto-focus confirm button
    setTimeout(() => {
        const confirmBtn = document.getElementById('confirmBtn');
        if (confirmBtn) confirmBtn.focus();
    }, 100);
}

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

    // Find in available cities
    const found = defaultCities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (found) {
        state.cities.push({ ...found });
        input.value = '';
        
        // Clear suggestions
        const suggestionsContainer = document.getElementById('suggestions');
        if (suggestionsContainer) suggestionsContainer.innerHTML = '';
        
        saveCitiesToStorage();
        renderCities();
        showToast(`✅ Added ${found.name}!`, 'success');
        
        // Close modal
        const modal = document.getElementById('cityModal');
        if (modal) modal.classList.remove('show');
        return;
    }

    showToast(`"${cityName}" not found in our list of ${defaultCities.length} cities`, 'error');
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
                    
                    // Show popular available cities when modal opens
                    const suggestionsContainer = document.getElementById('suggestions');
                    if (suggestionsContainer) {
                        const availableCities = defaultCities.filter(city =>
                            !state.cities.some(c => c.name === city.name)
                        ).slice(0, 8);
                        
                        suggestionsContainer.innerHTML = availableCities.map(city => `
                            <div class="suggestion-item" onclick="selectCity('${city.name}')">
                                <div class="suggestion-name">${city.name}</div>
                                <div class="suggestion-zone">${city.timezone}</div>
                            </div>
                        `).join('');
                    }
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
            if (modal) {
                modal.classList.remove('show');
                // Clear suggestions when modal closes
                const suggestionsContainer = document.getElementById('suggestions');
                if (suggestionsContainer) suggestionsContainer.innerHTML = '';
            }
        });
    });

    // City input - Enter key and suggestions
    const cityInput = document.getElementById('cityInput');
    if (cityInput) {
        const debouncedSuggestions = debounce(() => showSuggestions(cityInput), 100);
        
        cityInput.addEventListener('input', debouncedSuggestions);
        
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
