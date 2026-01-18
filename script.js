// Comprehensive cities database - 250+ cities worldwide
const citiesDatabase = {
    // North America - 30 cities
    'new york': 'America/New_York',
    'los angeles': 'America/Los_Angeles',
    'chicago': 'America/Chicago',
    'toronto': 'America/Toronto',
    'mexico city': 'America/Mexico_City',
    'vancouver': 'America/Vancouver',
    'denver': 'America/Denver',
    'seattle': 'America/Los_Angeles',
    'san francisco': 'America/Los_Angeles',
    'miami': 'America/New_York',
    'boston': 'America/New_York',
    'montreal': 'America/Toronto',
    'las vegas': 'America/Los_Angeles',
    'houston': 'America/Chicago',
    'phoenix': 'America/Phoenix',
    'philadelphia': 'America/New_York',
    'atlanta': 'America/New_York',
    'detroit': 'America/Detroit',
    'minneapolis': 'America/Chicago',
    'dallas': 'America/Chicago',
    'washington dc': 'America/New_York',
    'new orleans': 'America/Chicago',
    'portland': 'America/Los_Angeles',
    'austin': 'America/Chicago',
    'san diego': 'America/Los_Angeles',
    'san antonio': 'America/Chicago',
    'nashville': 'America/Chicago',
    'memphis': 'America/Chicago',
    'baltimore': 'America/New_York',
    'orlando': 'America/New_York',
    
    // South America - 18 cities
    'sao paulo': 'America/Sao_Paulo',
    'buenos aires': 'America/Argentina/Buenos_Aires',
    'lima': 'America/Lima',
    'bogota': 'America/Bogota',
    'rio de janeiro': 'America/Sao_Paulo',
    'caracas': 'America/Caracas',
    'santiago': 'America/Santiago',
    'quito': 'America/Guayaquil',
    'asuncion': 'America/Asuncion',
    'montevideo': 'America/Montevideo',
    'cartagena': 'America/Bogota',
    'valparaiso': 'America/Santiago',
    'cusco': 'America/Lima',
    'medelin': 'America/Bogota',
    'cali': 'America/Bogota',
    'la paz': 'America/La_Paz',
    'paramaribo': 'America/Paramaribo',
    'georgetown': 'America/Guyana',
    
    // Europe - 60 cities
    'london': 'Europe/London',
    'paris': 'Europe/Paris',
    'berlin': 'Europe/Berlin',
    'madrid': 'Europe/Madrid',
    'rome': 'Europe/Rome',
    'amsterdam': 'Europe/Amsterdam',
    'zurich': 'Europe/Zurich',
    'istanbul': 'Europe/Istanbul',
    'moscow': 'Europe/Moscow',
    'vienna': 'Europe/Vienna',
    'prague': 'Europe/Prague',
    'warsaw': 'Europe/Warsaw',
    'budapest': 'Europe/Budapest',
    'athens': 'Europe/Athens',
    'lisbon': 'Europe/Lisbon',
    'barcelona': 'Europe/Madrid',
    'milan': 'Europe/Rome',
    'venice': 'Europe/Rome',
    'dublin': 'Europe/London',
    'edinburgh': 'Europe/London',
    'stockholm': 'Europe/Stockholm',
    'oslo': 'Europe/Oslo',
    'copenhagen': 'Europe/Copenhagen',
    'helsinki': 'Europe/Helsinki',
    'brussels': 'Europe/Brussels',
    'geneva': 'Europe/Zurich',
    'bern': 'Europe/Zurich',
    'reykjavik': 'Atlantic/Reykjavik',
    'nicosia': 'Europe/Nicosia',
    'bucharest': 'Europe/Bucharest',
    'belgrade': 'Europe/Belgrade',
    'krakow': 'Europe/Warsaw',
    'bruges': 'Europe/Brussels',
    'valencia': 'Europe/Madrid',
    'seville': 'Europe/Madrid',
    'malaga': 'Europe/Madrid',
    'nice': 'Europe/Paris',
    'lyon': 'Europe/Paris',
    'marseille': 'Europe/Paris',
    'naples': 'Europe/Rome',
    'florence': 'Europe/Rome',
    'innsbruck': 'Europe/Vienna',
    'salzburg': 'Europe/Vienna',
    'zagreb': 'Europe/Belgrade',
    'split': 'Europe/Belgrade',
    'dubrovnik': 'Europe/Belgrade',
    'sofia': 'Europe/Sofia',
    'plovdiv': 'Europe/Sofia',
    'brno': 'Europe/Prague',
    'wroclaw': 'Europe/Warsaw',
    'gdansk': 'Europe/Warsaw',
    'thessaloniki': 'Europe/Athens',
    'rhodes': 'Europe/Athens',
    'corfu': 'Europe/Athens',
    'malta': 'Europe/Malta',
    'luxembourg': 'Europe/Luxembourg',
    'andorra la vella': 'Europe/Andorra',
    'monaco': 'Europe/Paris',
    'aarhus': 'Europe/Copenhagen',
    'gothenburg': 'Europe/Stockholm',
    'bergen': 'Europe/Oslo',
    'trondheim': 'Europe/Oslo',
    
    // Asia - 90 cities
    'tokyo': 'Asia/Tokyo',
    'dubai': 'Asia/Dubai',
    'singapore': 'Asia/Singapore',
    'hong kong': 'Asia/Hong_Kong',
    'bangkok': 'Asia/Bangkok',
    'mumbai': 'Asia/Kolkata',
    'delhi': 'Asia/Kolkata',
    'shanghai': 'Asia/Shanghai',
    'beijing': 'Asia/Shanghai',
    'seoul': 'Asia/Seoul',
    'kuala lumpur': 'Asia/Kuala_Lumpur',
    'hanoi': 'Asia/Ho_Chi_Minh',
    'ho chi minh city': 'Asia/Ho_Chi_Minh',
    'manila': 'Asia/Manila',
    'kolkata': 'Asia/Kolkata',
    'bangalore': 'Asia/Kolkata',
    'hyderabad': 'Asia/Kolkata',
    'jaipur': 'Asia/Kolkata',
    'agra': 'Asia/Kolkata',
    'varanasi': 'Asia/Kolkata',
    'colombo': 'Asia/Colombo',
    'dhaka': 'Asia/Dhaka',
    'lahore': 'Asia/Karachi',
    'karachi': 'Asia/Karachi',
    'islamabad': 'Asia/Karachi',
    'kabul': 'Asia/Kabul',
    'tehran': 'Asia/Tehran',
    'jerusalem': 'Asia/Jerusalem',
    'tel aviv': 'Asia/Jerusalem',
    'doha': 'Asia/Qatar',
    'abu dhabi': 'Asia/Dubai',
    'muscat': 'Asia/Muscat',
    'phuket': 'Asia/Bangkok',
    'chiang mai': 'Asia/Bangkok',
    'taipei': 'Asia/Taipei',
    'yangon': 'Asia/Yangon',
    'phnom penh': 'Asia/Phnom_Penh',
    'siem reap': 'Asia/Phnom_Penh',
    'jakarta': 'Asia/Jakarta',
    'bali': 'Asia/Jakarta',
    'bandung': 'Asia/Jakarta',
    'surabaya': 'Asia/Jakarta',
    'medan': 'Asia/Jakarta',
    'saigon': 'Asia/Ho_Chi_Minh',
    'macau': 'Asia/Shanghai',
    'qingdao': 'Asia/Shanghai',
    'hangzhou': 'Asia/Shanghai',
    'suzhou': 'Asia/Shanghai',
    'xian': 'Asia/Shanghai',
    'chongqing': 'Asia/Shanghai',
    'chengdu': 'Asia/Shanghai',
    'guilin': 'Asia/Shanghai',
    'nanjing': 'Asia/Shanghai',
    'guangzhou': 'Asia/Shanghai',
    'shenzhen': 'Asia/Shanghai',
    'wuhan': 'Asia/Shanghai',
    'chongqing': 'Asia/Shanghai',
    'nanning': 'Asia/Shanghai',
    'busan': 'Asia/Seoul',
    'incheon': 'Asia/Seoul',
    'daegu': 'Asia/Seoul',
    'daejeon': 'Asia/Seoul',
    'gwangju': 'Asia/Seoul',
    'osaka': 'Asia/Tokyo',
    'kyoto': 'Asia/Tokyo',
    'hiroshima': 'Asia/Tokyo',
    'nagasaki': 'Asia/Tokyo',
    'kobe': 'Asia/Tokyo',
    'yokohama': 'Asia/Tokyo',
    'sapporo': 'Asia/Tokyo',
    'fukuoka': 'Asia/Tokyo',
    'nagoya': 'Asia/Tokyo',
    'krabi': 'Asia/Bangkok',
    'koh samui': 'Asia/Bangkok',
    'udon thani': 'Asia/Bangkok',
    'pattaya': 'Asia/Bangkok',
    'rayong': 'Asia/Bangkok',
    'chumphon': 'Asia/Bangkok',
    'johor bahru': 'Asia/Kuala_Lumpur',
    'penang': 'Asia/Kuala_Lumpur',
    'ipoh': 'Asia/Kuala_Lumpur',
    'malacca': 'Asia/Kuala_Lumpur',
    'cebu': 'Asia/Manila',
    'davao': 'Asia/Manila',
    'iloilo': 'Asia/Manila',
    'quezon city': 'Asia/Manila',
    'makati': 'Asia/Manila',
    'taguig': 'Asia/Manila',
    'da nang': 'Asia/Ho_Chi_Minh',
    'can tho': 'Asia/Ho_Chi_Minh',
    'hai phong': 'Asia/Ho_Chi_Minh',
    'bacolod': 'Asia/Manila',
    'cagayan de oro': 'Asia/Manila',
    'zamboanga': 'Asia/Manila',
    
    // Africa - 45 cities
    'cairo': 'Africa/Cairo',
    'lagos': 'Africa/Lagos',
    'johannesburg': 'Africa/Johannesburg',
    'cape town': 'Africa/Johannesburg',
    'nairobi': 'Africa/Nairobi',
    'addis ababa': 'Africa/Addis_Ababa',
    'kampala': 'Africa/Kampala',
    'dar es salaam': 'Africa/Dar_es_Salaam',
    'accra': 'Africa/Accra',
    'marrakech': 'Africa/Casablanca',
    'casablanca': 'Africa/Casablanca',
    'fez': 'Africa/Casablanca',
    'tunis': 'Africa/Tunis',
    'algiers': 'Africa/Algiers',
    'khartoum': 'Africa/Khartoum',
    'kinshasa': 'Africa/Kinshasa',
    'luanda': 'Africa/Luanda',
    'dakar': 'Africa/Dakar',
    'ibadan': 'Africa/Lagos',
    'kano': 'Africa/Lagos',
    'bamako': 'Africa/Bamako',
    'ouagadougou': 'Africa/Ouagadougou',
    'niamey': 'Africa/Niamey',
    'maputo': 'Africa/Maputo',
    'lilongwe': 'Africa/Lilongwe',
    'lusaka': 'Africa/Lusaka',
    'harare': 'Africa/Harare',
    'gaborone': 'Africa/Gaborone',
    'maseru': 'Africa/Johannesburg',
    'windhoek': 'Africa/Windhoek',
    'kigali': 'Africa/Kigali',
    'bujumbura': 'Africa/Bujumbura',
    'mogadishu': 'Africa/Mogadishu',
    'juba': 'Africa/Juba',
    'khartoum': 'Africa/Khartoum',
    'port louis': 'Indian/Mauritius',
    'victoria': 'Indian/Seychelles',
    'antananarivo': 'Indian/Antananarivo',
    'toliara': 'Indian/Antananarivo',
    'durban': 'Africa/Johannesburg',
    'pretoria': 'Africa/Johannesburg',
    'bloemfontein': 'Africa/Johannesburg',
    'port elizabeth': 'Africa/Johannesburg',
    'mombasa': 'Africa/Nairobi',
    'kisumu': 'Africa/Nairobi',
    
    // Oceania - 25 cities
    'sydney': 'Australia/Sydney',
    'auckland': 'Pacific/Auckland',
    'melbourne': 'Australia/Melbourne',
    'brisbane': 'Australia/Brisbane',
    'perth': 'Australia/Perth',
    'adelaide': 'Australia/Adelaide',
    'hobart': 'Australia/Hobart',
    'canberra': 'Australia/Sydney',
    'gold coast': 'Australia/Sydney',
    'newcastle': 'Australia/Sydney',
    'wollongong': 'Australia/Sydney',
    'cairns': 'Australia/Brisbane',
    'darwin': 'Australia/Darwin',
    'townsville': 'Australia/Brisbane',
    'toowoomba': 'Australia/Brisbane',
    'geelong': 'Australia/Melbourne',
    'ballarat': 'Australia/Melbourne',
    'bendigo': 'Australia/Melbourne',
    'wellington': 'Pacific/Auckland',
    'christchurch': 'Pacific/Auckland',
    'hamilton': 'Pacific/Auckland',
    'tauranga': 'Pacific/Auckland',
    'rotorua': 'Pacific/Auckland',
    'queenstown': 'Pacific/Auckland',
    'fiji': 'Pacific/Fiji',
    'sunshine coast': 'Australia/Brisbane',
    'honolulu': 'Pacific/Honolulu',
    'samoa': 'Pacific/Apia',
    'tonga': 'Pacific/Tongatapu',
    'tahiti': 'Pacific/Tahiti',
    'palau': 'Pacific/Palau',
    'micronesia': 'Pacific/Chuuk',
    'guam': 'Pacific/Guam',
    'saipan': 'Pacific/Saipan',
    'ponapei': 'Pacific/Pohnpei',
    
    // Caribbean - 20 cities
    'havana': 'America/Havana',
    'santiago de cuba': 'America/Havana',
    'puerto rico': 'America/Puerto_Rico',
    'santo domingo': 'America/Santo_Domingo',
    'kingston': 'America/Jamaica',
    'montego bay': 'America/Jamaica',
    'port au prince': 'America/Haiti',
    'nassau': 'America/Nassau',
    'bridgetown': 'America/Barbados',
    'st johns': 'America/Antigua',
    'castries': 'America/St_Lucia',
    'kingstown': 'America/St_Vincent',
    'port of spain': 'America/Port_of_Spain',
    'willemstad': 'America/Curacao',
    'oranjestad': 'America/Aruba',
    'paramaribo': 'America/Paramaribo',
    'st george': 'America/Grenada',
    'basseterre': 'America/St_Kitts',
    'marigot': 'America/Guadeloupe',
    'pointe a pitre': 'America/Guadeloupe',
    
    // Middle East - 15 cities
    'riyadh': 'Asia/Riyadh',
    'jeddah': 'Asia/Riyadh',
    'mecca': 'Asia/Riyadh',
    'medina': 'Asia/Riyadh',
    'dubai': 'Asia/Dubai',
    'abu dhabi': 'Asia/Dubai',
    'sharjah': 'Asia/Dubai',
    'ajman': 'Asia/Dubai',
    'muscat': 'Asia/Muscat',
    'salalah': 'Asia/Muscat',
    'doha': 'Asia/Qatar',
    'kuwait city': 'Asia/Kuwait',
    'bahrain': 'Asia/Bahrain',
    'amman': 'Asia/Amman',
    'beirut': 'Asia/Beirut',
    
    // Central Asia - 12 cities
    'tashkent': 'Asia/Tashkent',
    'samarkand': 'Asia/Samarkand',
    'bukhara': 'Asia/Bukhara',
    'almaty': 'Asia/Almaty',
    'bishkek': 'Asia/Bishkek',
    'dushanbe': 'Asia/Dushanbe',
    'ashkhabad': 'Asia/Ashkhabad',
    'ashgabat': 'Asia/Ashgabat',
    'i': 'Asia/Aktau',
    'aktobe': 'Asia/Aqtobe',
    'kyzyl': 'Asia/Krasnoyarsk',
    'ulaanbaatar': 'Asia/Ulaanbaatar',
    
    // South Asia Extended - 15 cities
    'kathmandu': 'Asia/Kathmandu',
    'chittagong': 'Asia/Dhaka',
    'sylhet': 'Asia/Dhaka',
    'khulna': 'Asia/Dhaka',
    'peshawar': 'Asia/Karachi',
    'multan': 'Asia/Karachi',
    'rawalpindi': 'Asia/Karachi',
    'sialkot': 'Asia/Karachi',
    'goa': 'Asia/Kolkata',
    'pune': 'Asia/Kolkata',
    'ahmedabad': 'Asia/Kolkata',
    'surat': 'Asia/Kolkata',
    'vadodara': 'Asia/Kolkata',
    'coimbatore': 'Asia/Kolkata',
    'kochi': 'Asia/Kolkata',
    
    // East Africa Extended - 10 cities
    'asmara': 'Africa/Asmara',
    'djibouti': 'Africa/Djibouti',
    'mombasa': 'Africa/Nairobi',
    'kisii': 'Africa/Nairobi',
    'nakuru': 'Africa/Nairobi',
    'kigali': 'Africa/Kigali',
    'gitega': 'Africa/Bujumbura',
    'kigoma': 'Africa/Dar_es_Salaam',
    'mbeya': 'Africa/Dar_es_Salaam',
    'iringa': 'Africa/Dar_es_Salaam',
    
    // West Africa Extended - 10 cities
    'abidjan': 'Africa/Abidjan',
    'bouake': 'Africa/Abidjan',
    'douala': 'Africa/Douala',
    'yaounde': 'Africa/Lagos',
    'conakry': 'Africa/Conakry',
    'freetown': 'Africa/Freetown',
    'monrovia': 'Africa/Monrovia',
    'gbs': 'Africa/Bissau',
    'praia': 'Atlantic/Cape_Verde',
    'sao tome': 'Africa/Sao_Tome',
    
    // Southern Europe Extended - 10 cities
    'palermo': 'Europe/Rome',
    'catania': 'Europe/Rome',
    'taranto': 'Europe/Rome',
    'bari': 'Europe/Rome',
    'cordoba': 'Europe/Madrid',
    'granada': 'Europe/Madrid',
    'bilbao': 'Europe/Madrid',
    'zaragoza': 'Europe/Madrid',
    'murcia': 'Europe/Madrid',
    'almeria': 'Europe/Madrid',
    
    // Northern Europe Extended - 10 cities
    'tampere': 'Europe/Helsinki',
    'oulu': 'Europe/Helsinki',
    'turku': 'Europe/Helsinki',
    'kaunas': 'Europe/Vilnius',
    'klaipeda': 'Europe/Vilnius',
    'riga': 'Europe/Riga',
    'daugavpils': 'Europe/Riga',
    'tallinn': 'Europe/Tallinn',
    'tartu': 'Europe/Tallinn',
    'st petersburg': 'Europe/Moscow'
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
