// Comprehensive cities database - 760+ cities worldwide (v2.0)
// Updated: January 18, 2026 - Includes Sarajevo and 765+ world cities
// Total unique cities: 766 (with proper timezone mapping)

// Weather cache to prevent rapid fluctuations
const weatherCache = {};

const citiesDatabase = {
    // North America
    'abaie mahault': 'America/Puerto_Rico',
    'annotto bay': 'America/Jamaica',
    'arlet': 'America/Puerto_Rico',
    'asuncion': 'America/Asuncion',
    'atlanta': 'America/New_York',
    'austin': 'America/Chicago',
    'baie mahault': 'America/Puerto_Rico',
    'baltimore': 'America/New_York',
    'barahona': 'America/Puerto_Rico',
    'basseterre': 'America/Puerto_Rico',
    'black river': 'America/Jamaica',
    'boca chica': 'America/Puerto_Rico',
    'bogota': 'America/Bogota',
    'bonao': 'America/Puerto_Rico',
    'boston': 'America/New_York',
    'bridgetown': 'America/Puerto_Rico',
    'cabarete': 'America/Puerto_Rico',
    'cali': 'America/Bogota',
    'cap cana': 'America/Puerto_Rico',
    'capesterre': 'America/Puerto_Rico',
    'caracas': 'America/Caracas',
    'cartagena': 'America/Bogota',
    'castries': 'America/Puerto_Rico',
    'chicago': 'America/Chicago',
    'corn island': 'America/Jamaica',
    'cotui': 'America/Puerto_Rico',
    'dallas': 'America/Chicago',
    'denver': 'America/Denver',
    'deshaies': 'America/Puerto_Rico',
    'detroit': 'America/New_York',
    'ducos': 'America/Puerto_Rico',
    'espaillat': 'America/Puerto_Rico',
    'falmouth': 'America/Jamaica',
    'fort de france': 'America/Martinique',
    'georgetown': 'America/Guyana',
    'gosier': 'America/Puerto_Rico',
    'gourbeyre': 'America/Puerto_Rico',
    'green island': 'America/Jamaica',
    'hanover': 'America/Jamaica',
    'havana': 'America/New_York',
    'hope bay': 'America/Jamaica',
    'houston': 'America/Chicago',
    'jarabacoa': 'America/Puerto_Rico',
    'juan dolio': 'America/Puerto_Rico',
    'kingston': 'America/Jamaica',
    'kingstown': 'America/Puerto_Rico',
    'la paz': 'America/La_Paz',
    'la romana': 'America/Puerto_Rico',
    'la vega': 'America/Puerto_Rico',
    'lamentin': 'America/Puerto_Rico',
    'las vegas': 'America/Los_Angeles',
    'le francois': 'America/Puerto_Rico',
    'le vauclin': 'America/Puerto_Rico',
    'les anses': 'America/Martinique',
    'los angeles': 'America/Los_Angeles',
    'lucea': 'America/Jamaica',
    'marigot': 'America/Puerto_Rico',
    'medelin': 'America/Bogota',
    'memphis': 'America/Chicago',
    'mexico city': 'America/Mexico_City',
    'miami': 'America/New_York',
    'minneapolis': 'America/Chicago',
    'mobay': 'America/Jamaica',
    'moca': 'America/Puerto_Rico',
    'monte plata': 'America/Puerto_Rico',
    'montego bay': 'America/Jamaica',
    'montellano': 'America/Puerto_Rico',
    'montevideo': 'America/Montevideo',
    'montreal': 'America/Toronto',
    'morne rouge': 'America/Puerto_Rico',
    'moule': 'America/Puerto_Rico',
    'nashville': 'America/Chicago',
    'nassau': 'America/New_York',
    'negril': 'America/Jamaica',
    'new orleans': 'America/Chicago',
    'new york': 'America/New_York',
    'ocho rios': 'America/Jamaica',
    'oranjestad': 'America/Puerto_Rico',
    'orlando': 'America/New_York',
    'paramaribo': 'America/Paramaribo',
    'petit bourg': 'America/Puerto_Rico',
    'philadelphia': 'America/New_York',
    'phoenix': 'America/Phoenix',
    'pointe a pitre': 'America/Puerto_Rico',
    'port antonio': 'America/Jamaica',
    'port au prince': 'America/New_York',
    'port of spain': 'America/Puerto_Rico',
    'portland': 'America/Los_Angeles',
    'puerto plata': 'America/Puerto_Rico',
    'puerto rico': 'America/Puerto_Rico',
    'punta cana': 'America/Santo_Domingo',
    'quito': 'America/Guayaquil',
    'riviere pilote': 'America/Puerto_Rico',
    'runaway bay': 'America/Jamaica',
    'saint joseph': 'America/Martinique',
    'sainte anne': 'America/Puerto_Rico',
    'sainte rose': 'America/Puerto_Rico',
    'san antonio': 'America/Chicago',
    'san diego': 'America/Los_Angeles',
    'san francisco': 'America/Los_Angeles',
    'san pedro de macoris': 'America/Puerto_Rico',
    'santa cruz': 'America/Jamaica',
    'santiago': 'America/Santiago',
    'santiago de cuba': 'America/Havana',
    'santo domingo': 'America/Puerto_Rico',
    'savanna la mar': 'America/Jamaica',
    'schoelcher': 'America/Puerto_Rico',
    'seattle': 'America/Los_Angeles',
    'sosua': 'America/Puerto_Rico',
    'st george': 'America/Puerto_Rico',
    'st johns': 'America/Puerto_Rico',
    'toronto': 'America/Toronto',
    'trinite': 'America/Puerto_Rico',
    'trois ilets': 'America/Puerto_Rico',
    'trois rivieres': 'America/Puerto_Rico',
    'uvero alto': 'America/Puerto_Rico',
    'valparaiso': 'America/Santiago',
    'vancouver': 'America/Vancouver',
    'washington dc': 'America/New_York',
    'westmoreland': 'America/Jamaica',
    'willemstad': 'America/Puerto_Rico',

    // South America
    'buenos aires': 'America/Argentina/Buenos_Aires',
    'cusco': 'America/Lima',
    'lima': 'America/Lima',
    'rio de janeiro': 'America/Sao_Paulo',
    'sao paulo': 'America/Sao_Paulo',

    // Europe
    'aarhus': 'Europe/Copenhagen',
    'almeria': 'Europe/Madrid',
    'amsterdam': 'Europe/Amsterdam',
    'andorra la vella': 'Europe/Andorra',
    'athens': 'Europe/Athens',
    'banja luka': 'Europe/Sarajevo',
    'barcelona': 'Europe/Madrid',
    'bari': 'Europe/Rome',
    'belfast': 'Europe/London',
    'belgrade': 'Europe/Belgrade',
    'bergen': 'Europe/Oslo',
    'berlin': 'Europe/Berlin',
    'bern': 'Europe/Zurich',
    'bialystok': 'Europe/Warsaw',
    'bilbao': 'Europe/Madrid',
    'brno': 'Europe/Prague',
    'bruges': 'Europe/Brussels',
    'brussels': 'Europe/Brussels',
    'bucharest': 'Europe/Bucharest',
    'budapest': 'Europe/Budapest',
    'catania': 'Europe/Rome',
    'copenhagen': 'Europe/Copenhagen',
    'cordoba': 'Europe/Madrid',
    'corfu': 'Europe/Athens',
    'cork': 'Europe/London',
    'czestochowa': 'Europe/Warsaw',
    'daugavpils': 'Europe/Riga',
    'dnipro': 'Europe/Kyiv',
    'donetsk': 'Europe/Kyiv',
    'dublin': 'Europe/London',
    'dubrovnik': 'Europe/Belgrade',
    'edinburgh': 'Europe/London',
    'florence': 'Europe/Rome',
    'galway': 'Europe/London',
    'gdansk': 'Europe/Warsaw',
    'gdynia': 'Europe/Warsaw',
    'geneva': 'Europe/Zurich',
    'gothenburg': 'Europe/Stockholm',
    'granada': 'Europe/Madrid',
    'grimstad': 'Europe/Oslo',
    'helsinki': 'Europe/Helsinki',
    'innsbruck': 'Europe/Vienna',
    'istanbul': 'Europe/Istanbul',
    'kaunas': 'Europe/Vilnius',
    'kharkiv': 'Europe/Kyiv',
    'kherson': 'Europe/Kyiv',
    'kielce': 'Europe/Warsaw',
    'klaipeda': 'Europe/Vilnius',
    'krakow': 'Europe/Warsaw',
    'krakow2': 'Europe/Warsaw',
    'lisbon': 'Europe/Lisbon',
    'lodz': 'Europe/Warsaw',
    'london': 'Europe/London',
    'lublin': 'Europe/Warsaw',
    'luxembourg': 'Europe/Luxembourg',
    'lviv': 'Europe/Kyiv',
    'lyon': 'Europe/Paris',
    'madrid': 'Europe/Madrid',
    'malaga': 'Europe/Madrid',
    'malta': 'Europe/Malta',
    'mariupol': 'Europe/Kyiv',
    'marseille': 'Europe/Paris',
    'melitopol': 'Europe/Kyiv',
    'milan': 'Europe/Rome',
    'monaco': 'Europe/Paris',
    'moscow': 'Europe/Moscow',
    'mostar': 'Europe/Sarajevo',
    'murcia': 'Europe/Madrid',
    'mykolaiv': 'Europe/Kyiv',
    'naples': 'Europe/Rome',
    'nice': 'Europe/Paris',
    'nicosia': 'Europe/Nicosia',
    'odesa': 'Europe/Kyiv',
    'oslo': 'Europe/Oslo',
    'oulu': 'Europe/Helsinki',
    'palermo': 'Europe/Rome',
    'paris': 'Europe/Paris',
    'plock': 'Europe/Warsaw',
    'plovdiv': 'Europe/Sofia',
    'poznan': 'Europe/Warsaw',
    'prague': 'Europe/Prague',
    'praia': 'Atlantic/Cape_Verde',
    'prijedor': 'Europe/Sarajevo',
    'radom': 'Europe/Warsaw',
    'reykjavik': 'Atlantic/Reykjavik',
    'rhodes': 'Europe/Athens',
    'riga': 'Europe/Riga',
    'rome': 'Europe/Rome',
    'salzburg': 'Europe/Vienna',
    'sarajevo': 'Europe/Sarajevo',
    'seville': 'Europe/Madrid',
    'sofia': 'Europe/Sofia',
    'split': 'Europe/Belgrade',
    'st petersburg': 'Europe/Moscow',
    'stavanger': 'Europe/Oslo',
    'stockholm': 'Europe/Stockholm',
    'sumy': 'Europe/Kyiv',
    'tallinn': 'Europe/Tallinn',
    'tampere': 'Europe/Helsinki',
    'taranto': 'Europe/Rome',
    'tartu': 'Europe/Tallinn',
    'thessaloniki': 'Europe/Athens',
    'trebinje': 'Europe/Sarajevo',
    'trondheim': 'Europe/Oslo',
    'turku': 'Europe/Helsinki',
    'tuzla': 'Europe/Sarajevo',
    'valencia': 'Europe/Madrid',
    'venice': 'Europe/Rome',
    'vienna': 'Europe/Vienna',
    'visegrad': 'Europe/Sarajevo',
    'warsaw': 'Europe/Warsaw',
    'wroclaw': 'Europe/Warsaw',
    'zagreb': 'Europe/Belgrade',
    'zaragoza': 'Europe/Madrid',
    'zenica': 'Europe/Sarajevo',
    'zurich': 'Europe/Zurich',

    // Asia
    'abu dhabi': 'Asia/Dubai',
    'agra': 'Asia/Kolkata',
    'ahmedabad': 'Asia/Kolkata',
    'ajman': 'Asia/Dubai',
    'aktobe': 'Asia/Aqtobe',
    'aley': 'Asia/Beirut',
    'almaty': 'Asia/Almaty',
    'amman': 'Asia/Amman',
    'amnat charoen': 'Asia/Bangkok',
    'antananarivo': 'Indian/Antananarivo',
    'arakkonam': 'Asia/Kolkata',
    'arsal': 'Asia/Beirut',
    'aruppukottai': 'Asia/Kolkata',
    'ashgabat': 'Asia/Ashgabat',
    'ashkhabad': 'Asia/Ashkhabad',
    'baalbek': 'Asia/Beirut',
    'bacolod': 'Asia/Manila',
    'bagan': 'Asia/Yangon',
    'baguio': 'Asia/Manila',
    'bahrain': 'Asia/Bahrain',
    'bali': 'Asia/Jakarta',
    'bandar seri begawan': 'Asia/Brunei',
    'bandung': 'Asia/Jakarta',
    'bangalore': 'Asia/Kolkata',
    'bangkok': 'Asia/Bangkok',
    'bapatla': 'Asia/Kolkata',
    'beijing': 'Asia/Shanghai',
    'beirut': 'Asia/Beirut',
    'bekaa valley': 'Asia/Beirut',
    'bint jbeil': 'Asia/Beirut',
    'bishkek': 'Asia/Bishkek',
    'bodinayakanur': 'Asia/Kolkata',
    'boracay': 'Asia/Manila',
    'brunei': 'Asia/Brunei',
    'bukhara': 'Asia/Bukhara',
    'bumthang': 'Asia/Thimphu',
    'busan': 'Asia/Seoul',
    'butuan': 'Asia/Manila',
    'cagayan de oro': 'Asia/Manila',
    'calicut': 'Asia/Kolkata',
    'cameron highlands': 'Asia/Kuala_Lumpur',
    'can tho': 'Asia/Ho_Chi_Minh',
    'cebu': 'Asia/Manila',
    'chachoengsao': 'Asia/Bangkok',
    'chaiyaphum': 'Asia/Bangkok',
    'chengalpattu': 'Asia/Kolkata',
    'chengdu': 'Asia/Shanghai',
    'chettinad': 'Asia/Kolkata',
    'chiang mai': 'Asia/Bangkok',
    'chittagong': 'Asia/Dhaka',
    'chongqing': 'Asia/Shanghai',
    'chumey': 'Asia/Thimphu',
    'chumphon': 'Asia/Bangkok',
    'chumphon2': 'Asia/Bangkok',
    'coimbatore': 'Asia/Kolkata',
    'colombo': 'Asia/Colombo',
    'cumbum': 'Asia/Kolkata',
    'da nang': 'Asia/Ho_Chi_Minh',
    'daegu': 'Asia/Seoul',
    'daejeon': 'Asia/Seoul',
    'davao': 'Asia/Manila',
    'delhi': 'Asia/Kolkata',
    'dhaka': 'Asia/Dhaka',
    'dindigul': 'Asia/Kolkata',
    'doha': 'Asia/Qatar',
    'dubai': 'Asia/Dubai',
    'dumaguete': 'Asia/Manila',
    'dushanbe': 'Asia/Dushanbe',
    'erode': 'Asia/Kolkata',
    'fukuoka': 'Asia/Tokyo',
    'gasa': 'Asia/Thimphu',
    'general santos': 'Asia/Manila',
    'george town': 'Asia/Kuala_Lumpur',
    'goa': 'Asia/Kolkata',
    'guangzhou': 'Asia/Shanghai',
    'guilin': 'Asia/Shanghai',
    'guntur': 'Asia/Kolkata',
    'gwangju': 'Asia/Seoul',
    'haa': 'Asia/Thimphu',
    'hai phong': 'Asia/Ho_Chi_Minh',
    'hangzhou': 'Asia/Shanghai',
    'hanoi': 'Asia/Ho_Chi_Minh',
    'hatyai': 'Asia/Bangkok',
    'hermel': 'Asia/Beirut',
    'hiroshima': 'Asia/Tokyo',
    'ho chi minh city': 'Asia/Ho_Chi_Minh',
    'hong kong': 'Asia/Hong_Kong',
    'hua hin': 'Asia/Bangkok',
    'hyderabad': 'Asia/Kolkata',
    'i': 'Asia/Aktau',
    'iloilo': 'Asia/Manila',
    'incheon': 'Asia/Seoul',
    'ipoh': 'Asia/Kuala_Lumpur',
    'islamabad': 'Asia/Karachi',
    'jaipur': 'Asia/Kolkata',
    'jakar': 'Asia/Thimphu',
    'jakarta': 'Asia/Jakarta',
    'jbeil': 'Asia/Beirut',
    'jeddah': 'Asia/Riyadh',
    'jerusalem': 'Asia/Jerusalem',
    'jezzine': 'Asia/Beirut',
    'johor bahru': 'Asia/Kuala_Lumpur',
    'jounieh': 'Asia/Beirut',
    'kabul': 'Asia/Kabul',
    'kalasin': 'Asia/Bangkok',
    'kamphaengphet': 'Asia/Bangkok',
    'kanchanaburi': 'Asia/Bangkok',
    'kanchipuram': 'Asia/Kolkata',
    'kannur': 'Asia/Kolkata',
    'karachi': 'Asia/Karachi',
    'karaikudi': 'Asia/Kolkata',
    'karur': 'Asia/Kolkata',
    'kathmandu': 'Asia/Kathmandu',
    'kavali': 'Asia/Kolkata',
    'keserwan': 'Asia/Beirut',
    'khon kaen': 'Asia/Bangkok',
    'khulna': 'Asia/Dhaka',
    'kobe': 'Asia/Tokyo',
    'kochi': 'Asia/Kolkata',
    'koh samui': 'Asia/Bangkok',
    'kolkata': 'Asia/Kolkata',
    'koronadal': 'Asia/Manila',
    'kota kinabalu': 'Asia/Kuala_Lumpur',
    'kottayam': 'Asia/Kolkata',
    'krabi': 'Asia/Bangkok',
    'krabi2': 'Asia/Bangkok',
    'krishnagiri': 'Asia/Kolkata',
    'kuala lumpur': 'Asia/Kuala_Lumpur',
    'kuching': 'Asia/Kuala_Lumpur',
    'kumbakonam': 'Asia/Kolkata',
    'kuwait city': 'Asia/Kuwait',
    'kyoto': 'Asia/Tokyo',
    'kyzyl': 'Asia/Krasnoyarsk',
    'labuan': 'Asia/Kuala_Lumpur',
    'lahore': 'Asia/Karachi',
    'lampang': 'Asia/Bangkok',
    'lamphun': 'Asia/Bangkok',
    'lapu lapu': 'Asia/Manila',
    'laya': 'Asia/Thimphu',
    'lingzi': 'Asia/Thimphu',
    'loei': 'Asia/Bangkok',
    'lopburi': 'Asia/Bangkok',
    'macau': 'Asia/Shanghai',
    'madurai': 'Asia/Kolkata',
    'maha sarakham': 'Asia/Bangkok',
    'makati': 'Asia/Manila',
    'malacca': 'Asia/Kuala_Lumpur',
    'malaybalay': 'Asia/Manila',
    'mandalay': 'Asia/Yangon',
    'mandaue': 'Asia/Manila',
    'manila': 'Asia/Manila',
    'marjayoun': 'Asia/Beirut',
    'mawlamyine': 'Asia/Yangon',
    'mecca': 'Asia/Riyadh',
    'medan': 'Asia/Jakarta',
    'medina': 'Asia/Riyadh',
    'metn': 'Asia/Beirut',
    'miri': 'Asia/Kuala_Lumpur',
    'mongla': 'Asia/Thimphu',
    'mukdahan': 'Asia/Bangkok',
    'multan': 'Asia/Karachi',
    'mumbai': 'Asia/Kolkata',
    'muscat': 'Asia/Muscat',
    'myitkyina': 'Asia/Yangon',
    'nabatiye': 'Asia/Beirut',
    'nagasaki': 'Asia/Tokyo',
    'nagoya': 'Asia/Tokyo',
    'naidupet': 'Asia/Kolkata',
    'nakhon phanom': 'Asia/Bangkok',
    'nakhon ratchasima': 'Asia/Bangkok',
    'nakhon sawan': 'Asia/Bangkok',
    'nakhon si thammarat': 'Asia/Bangkok',
    'nan': 'Asia/Bangkok',
    'nanjing': 'Asia/Shanghai',
    'nanning': 'Asia/Shanghai',
    'nellore': 'Asia/Kolkata',
    'nob gang': 'Asia/Thimphu',
    'nong khai': 'Asia/Bangkok',
    'nuziveedu': 'Asia/Kolkata',
    'ongole': 'Asia/Kolkata',
    'osaka': 'Asia/Tokyo',
    'pagan': 'Asia/Yangon',
    'palawan': 'Asia/Manila',
    'paro': 'Asia/Thimphu',
    'pathein': 'Asia/Yangon',
    'pattani': 'Asia/Bangkok',
    'pattaya': 'Asia/Bangkok',
    'pemagatshel': 'Asia/Thimphu',
    'penang': 'Asia/Kuala_Lumpur',
    'peshawar': 'Asia/Karachi',
    'phang nga': 'Asia/Bangkok',
    'phatthalung': 'Asia/Bangkok',
    'phayao': 'Asia/Bangkok',
    'phichit': 'Asia/Bangkok',
    'phitsanulok': 'Asia/Bangkok',
    'phnom penh': 'Asia/Phnom_Penh',
    'phrae': 'Asia/Bangkok',
    'phuket': 'Asia/Bangkok',
    'phuket2': 'Asia/Bangkok',
    'port louis': 'Indian/Mauritius',
    'prachuap': 'Asia/Bangkok',
    'prachuap khiri khan': 'Asia/Bangkok',
    'punakha': 'Asia/Thimphu',
    'pune': 'Asia/Kolkata',
    'qalamoun': 'Asia/Beirut',
    'qingdao': 'Asia/Shanghai',
    'quezon city': 'Asia/Manila',
    'rajahmundry': 'Asia/Kolkata',
    'rajapalayam': 'Asia/Kolkata',
    'ramanathapuram': 'Asia/Kolkata',
    'ranipet': 'Asia/Kolkata',
    'ranong': 'Asia/Bangkok',
    'rashaya': 'Asia/Beirut',
    'ratchaburi': 'Asia/Bangkok',
    'rawalpindi': 'Asia/Karachi',
    'rayong': 'Asia/Bangkok',
    'riyadh': 'Asia/Riyadh',
    'roi et': 'Asia/Bangkok',
    'saigon': 'Asia/Ho_Chi_Minh',
    'sakon nakhon': 'Asia/Bangkok',
    'salalah': 'Asia/Muscat',
    'salem': 'Asia/Kolkata',
    'samarkand': 'Asia/Samarkand',
    'samdrup': 'Asia/Thimphu',
    'samtse': 'Asia/Thimphu',
    'sandakan': 'Asia/Kuala_Lumpur',
    'sapporo': 'Asia/Tokyo',
    'saraburi': 'Asia/Bangkok',
    'sattur': 'Asia/Kolkata',
    'satun': 'Asia/Bangkok',
    'semporna': 'Asia/Kuala_Lumpur',
    'seoul': 'Asia/Seoul',
    'shanghai': 'Asia/Shanghai',
    'sharjah': 'Asia/Dubai',
    'shenzhen': 'Asia/Shanghai',
    'shouf': 'Asia/Beirut',
    'sialkot': 'Asia/Karachi',
    'siargao': 'Asia/Manila',
    'sibu': 'Asia/Kuala_Lumpur',
    'sidon': 'Asia/Beirut',
    'siem reap': 'Asia/Phnom_Penh',
    'singapore': 'Asia/Singapore',
    'sittwe': 'Asia/Yangon',
    'sivaganga': 'Asia/Kolkata',
    'songkhla': 'Asia/Bangkok',
    'srivilliputhur': 'Asia/Kolkata',
    'sukhothai': 'Asia/Bangkok',
    'sullurpet': 'Asia/Kolkata',
    'surabaya': 'Asia/Jakarta',
    'surat': 'Asia/Kolkata',
    'surat thani': 'Asia/Bangkok',
    'suzhou': 'Asia/Shanghai',
    'sylhet': 'Asia/Dhaka',
    'tachileik': 'Asia/Yangon',
    'tacloban': 'Asia/Manila',
    'taguig': 'Asia/Manila',
    'tagum': 'Asia/Manila',
    'taipei': 'Asia/Taipei',
    'tak': 'Asia/Bangkok',
    'tang': 'Asia/Thimphu',
    'tashkent': 'Asia/Tashkent',
    'tawau': 'Asia/Kuala_Lumpur',
    'tehran': 'Asia/Tehran',
    'tel aviv': 'Asia/Jerusalem',
    'tenali': 'Asia/Kolkata',
    'thanjavur': 'Asia/Kolkata',
    'theni': 'Asia/Kolkata',
    'thimphu': 'Asia/Thimphu',
    'thiruvananthapuram': 'Asia/Kolkata',
    'thrissur': 'Asia/Kolkata',
    'tiruchirappalli': 'Asia/Kolkata',
    'tirumangalam': 'Asia/Kolkata',
    'tirupati': 'Asia/Kolkata',
    'tiruppur': 'Asia/Kolkata',
    'tiruttani': 'Asia/Kolkata',
    'tiruvannamalai': 'Asia/Kolkata',
    'tokyo': 'Asia/Tokyo',
    'toliara': 'Indian/Antananarivo',
    'tondi': 'Asia/Kolkata',
    'trang': 'Asia/Bangkok',
    'trashigang': 'Asia/Thimphu',
    'trashiyangtse': 'Asia/Thimphu',
    'trat': 'Asia/Bangkok',
    'tripoli': 'Asia/Beirut',
    'trongsa': 'Asia/Thimphu',
    'tyre': 'Asia/Beirut',
    'ubon ratchathani': 'Asia/Bangkok',
    'udayarpalayam': 'Asia/Kolkata',
    'udon thani': 'Asia/Bangkok',
    'ulaanbaatar': 'Asia/Ulaanbaatar',
    'uthai thani': 'Asia/Bangkok',
    'uttaradit': 'Asia/Bangkok',
    'vadodara': 'Asia/Kolkata',
    'varanasi': 'Asia/Kolkata',
    'vellore': 'Asia/Kolkata',
    'victoria': 'Indian/Seychelles',
    'vijayawada': 'Asia/Kolkata',
    'villupuram': 'Asia/Kolkata',
    'virudunagar': 'Asia/Kolkata',
    'visakhapatnam': 'Asia/Kolkata',
    'walajah': 'Asia/Kolkata',
    'walajapet': 'Asia/Kolkata',
    'wangdue': 'Asia/Thimphu',
    'wuhan': 'Asia/Shanghai',
    'xian': 'Asia/Shanghai',
    'yangon': 'Asia/Yangon',
    'yangon2': 'Asia/Yangon',
    'yasothon': 'Asia/Bangkok',
    'yokohama': 'Asia/Tokyo',
    'zamboanga': 'Asia/Manila',

    // Africa
    'abbasiya': 'Africa/Cairo',
    'abidjan': 'Africa/Abidjan',
    'accra': 'Africa/Accra',
    'addis ababa': 'Africa/Addis_Ababa',
    'agouza': 'Africa/Cairo',
    'ain shams': 'Africa/Cairo',
    'algiers': 'Africa/Algiers',
    'arusha': 'Africa/Dar_es_Salaam',
    'asmara': 'Africa/Asmara',
    'bamako': 'Africa/Bamako',
    'beitbridge': 'Africa/Harare',
    'blantyre': 'Africa/Lilongwe',
    'bloemfontein': 'Africa/Johannesburg',
    'bouake': 'Africa/Abidjan',
    'bujumbura': 'Africa/Bujumbura',
    'bulaq': 'Africa/Cairo',
    'bulawayo': 'Africa/Harare',
    'cairo': 'Africa/Cairo',
    'cape town': 'Africa/Johannesburg',
    'casablanca': 'Africa/Casablanca',
    'chingola': 'Africa/Lusaka',
    'chinhoyi': 'Africa/Harare',
    'chipata': 'Africa/Lusaka',
    'conakry': 'Africa/Conakry',
    'dakar': 'Africa/Dakar',
    'dar es salaam': 'Africa/Dar_es_Salaam',
    'dedza': 'Africa/Lilongwe',
    'djibouti': 'Africa/Djibouti',
    'dokki': 'Africa/Cairo',
    'douala': 'Africa/Douala',
    'dowa': 'Africa/Lilongwe',
    'durban': 'Africa/Johannesburg',
    'eldoret': 'Africa/Nairobi',
    'faisal': 'Africa/Cairo',
    'fez': 'Africa/Casablanca',
    'francistown': 'Africa/Gaborone',
    'freetown': 'Africa/Freetown',
    'gaborone': 'Africa/Gaborone',
    'gaborone2': 'Africa/Gaborone',
    'gbs': 'Africa/Bissau',
    'gezira': 'Africa/Cairo',
    'gitega': 'Africa/Bujumbura',
    'giza': 'Africa/Cairo',
    'gweru': 'Africa/Harare',
    'haram': 'Africa/Cairo',
    'harare': 'Africa/Harare',
    'harare2': 'Africa/Harare',
    'heliopolis': 'Africa/Cairo',
    'helwan': 'Africa/Cairo',
    'hwange': 'Africa/Harare',
    'ibadan': 'Africa/Lagos',
    'iringa': 'Africa/Dar_es_Salaam',
    'johannesburg': 'Africa/Johannesburg',
    'juba': 'Africa/Juba',
    'jwaneng': 'Africa/Gaborone',
    'kabwe': 'Africa/Lusaka',
    'kadoma': 'Africa/Harare',
    'kakamega': 'Africa/Nairobi',
    'kalulushi': 'Africa/Lusaka',
    'kampala': 'Africa/Kampala',
    'kang': 'Africa/Gaborone',
    'kano': 'Africa/Lagos',
    'kansanshi': 'Africa/Lusaka',
    'kasama': 'Africa/Lusaka',
    'kasane': 'Africa/Gaborone',
    'kasr en nile': 'Africa/Cairo',
    'kasungu': 'Africa/Lilongwe',
    'kericho': 'Africa/Nairobi',
    'khartoum': 'Africa/Khartoum',
    'kigali': 'Africa/Kigali',
    'kigoma': 'Africa/Dar_es_Salaam',
    'kijabe': 'Africa/Nairobi',
    'kilifi': 'Africa/Nairobi',
    'kilimanjaro': 'Africa/Dar_es_Salaam',
    'kinshasa': 'Africa/Kinshasa',
    'kisii': 'Africa/Nairobi',
    'kisumu': 'Africa/Nairobi',
    'kitui': 'Africa/Nairobi',
    'kitwe': 'Africa/Lusaka',
    'kocheng': 'Africa/Gaborone',
    'kwekwe': 'Africa/Harare',
    'lagos': 'Africa/Lagos',
    'lamu': 'Africa/Nairobi',
    'lilongwe': 'Africa/Lilongwe',
    'lilongwe2': 'Africa/Lilongwe',
    'lindi': 'Africa/Dar_es_Salaam',
    'livingstone': 'Africa/Lusaka',
    'lobatse': 'Africa/Gaborone',
    'luanda': 'Africa/Luanda',
    'lusaka': 'Africa/Lusaka',
    'lusaka2': 'Africa/Lusaka',
    'maadi': 'Africa/Cairo',
    'machakos': 'Africa/Nairobi',
    'malindi': 'Africa/Nairobi',
    'mangochi': 'Africa/Lilongwe',
    'mansa': 'Africa/Lusaka',
    'maputo': 'Africa/Maputo',
    'marrakech': 'Africa/Casablanca',
    'maseru': 'Africa/Johannesburg',
    'masvingo': 'Africa/Harare',
    'matareya': 'Africa/Cairo',
    'maun': 'Africa/Gaborone',
    'mbeya': 'Africa/Dar_es_Salaam',
    'mbeya2': 'Africa/Dar_es_Salaam',
    'mchinji': 'Africa/Lilongwe',
    'meru': 'Africa/Nairobi',
    'mogadishu': 'Africa/Mogadishu',
    'mohandessin': 'Africa/Cairo',
    'molepolole': 'Africa/Gaborone',
    'mombasa': 'Africa/Nairobi',
    'mongu': 'Africa/Lusaka',
    'monrovia': 'Africa/Monrovia',
    'moshi': 'Africa/Dar_es_Salaam',
    'mufulira': 'Africa/Lusaka',
    'muranga': 'Africa/Nairobi',
    'mutare': 'Africa/Harare',
    'mwanza': 'Africa/Dar_es_Salaam',
    'mzuzu': 'Africa/Lilongwe',
    'nairobi': 'Africa/Nairobi',
    'nakuru': 'Africa/Nairobi',
    'nanyuki': 'Africa/Nairobi',
    'nasr city': 'Africa/Cairo',
    'ndola': 'Africa/Lusaka',
    'new cairo': 'Africa/Cairo',
    'niamey': 'Africa/Niamey',
    'nkana': 'Africa/Lusaka',
    'nkhata bay': 'Africa/Lilongwe',
    'nkhotakota': 'Africa/Lilongwe',
    'norton': 'Africa/Harare',
    'nyeri': 'Africa/Nairobi',
    'ouagadougou': 'Africa/Ouagadougou',
    'palapye': 'Africa/Gaborone',
    'port elizabeth': 'Africa/Johannesburg',
    'pretoria': 'Africa/Johannesburg',
    'salima': 'Africa/Lilongwe',
    'sao tome': 'Africa/Sao_Tome',
    'sayyida zeinab': 'Africa/Cairo',
    'selibe-phikwe': 'Africa/Gaborone',
    'serowe': 'Africa/Gaborone',
    'shubra': 'Africa/Cairo',
    'solwezi': 'Africa/Lusaka',
    'songea': 'Africa/Dar_es_Salaam',
    'tabora': 'Africa/Dar_es_Salaam',
    'tanga': 'Africa/Dar_es_Salaam',
    'tunis': 'Africa/Tunis',
    'victoria falls': 'Africa/Harare',
    'windhoek': 'Africa/Windhoek',
    'yaounde': 'Africa/Lagos',
    'zamalek': 'Africa/Cairo',
    'zomba': 'Africa/Lilongwe',

    // Oceania
    'adelaide': 'Australia/Adelaide',
    'airai': 'Pacific/Palau',
    'apia2': 'Pacific/Apia',
    'auckland': 'Pacific/Auckland',
    'auckland2': 'Pacific/Auckland',
    'ballarat': 'Australia/Melbourne',
    'bendigo': 'Australia/Melbourne',
    'brisbane': 'Australia/Brisbane',
    'cairns': 'Australia/Brisbane',
    'canberra': 'Australia/Sydney',
    'christchurch': 'Pacific/Auckland',
    'darwin': 'Australia/Darwin',
    'fiji': 'Pacific/Fiji',
    'geelong': 'Australia/Melbourne',
    'gisborne': 'Pacific/Auckland',
    'gold coast': 'Australia/Sydney',
    'guam': 'Pacific/Guam',
    'hamilton': 'Pacific/Auckland',
    'hastings': 'Pacific/Auckland',
    'hobart': 'Australia/Hobart',
    'honolulu': 'Pacific/Honolulu',
    'hutt valley': 'Pacific/Auckland',
    'koror': 'Pacific/Palau',
    'levin': 'Pacific/Auckland',
    'lotofaga': 'Pacific/Apia',
    'lower hutt': 'Pacific/Auckland',
    'masterton': 'Pacific/Auckland',
    'melbourne': 'Australia/Melbourne',
    'melekeok': 'Pacific/Palau',
    'micronesia': 'Pacific/Chuuk',
    'napier': 'Pacific/Auckland',
    'newcastle': 'Australia/Sydney',
    'ngeremlengui': 'Pacific/Palau',
    'ngerulmud': 'Pacific/Palau',
    'pago pago': 'Pacific/Pago_Pago',
    'palau': 'Pacific/Palau',
    'palmerston north': 'Pacific/Auckland',
    'paraparaumu': 'Pacific/Auckland',
    'perth': 'Australia/Perth',
    'ponapei': 'Pacific/Pohnpei',
    'queenstown': 'Pacific/Auckland',
    'rotorua': 'Pacific/Auckland',
    'safotulafai': 'Pacific/Apia',
    'saipan': 'Pacific/Saipan',
    'samoa': 'Pacific/Apia',
    'sunshine coast': 'Australia/Brisbane',
    'sydney': 'Australia/Sydney',
    'tahiti': 'Pacific/Tahiti',
    'tauranga': 'Pacific/Auckland',
    'tonga': 'Pacific/Tongatapu',
    'toowoomba': 'Australia/Brisbane',
    'townsville': 'Australia/Brisbane',
    'u': 'Pacific/Apia',
    'uuli': 'Pacific/Pago_Pago',
    'wellington': 'Pacific/Auckland',
    'whangarei': 'Pacific/Auckland',
    'wollongong': 'Australia/Sydney',
    'yap': 'Pacific/Chuuk',

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
    
    // Update times every 500ms for smooth real-time updates
    setInterval(updateTime, 500);
    setInterval(updateHeaderTime, 500);
    
    // Clear weather cache every hour to allow temperature changes
    setInterval(() => {
        for (const key in weatherCache) {
            delete weatherCache[key];
        }
    }, 3600000); // Clear every 60 minutes
    
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
    try {
        const date = new Date();
        
        // Use toLocaleString for reliable timezone conversion
        const options = {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: !use24HourFormat
        };
        
        let timeString = date.toLocaleString('en-US', options);
        
        // If we don't want seconds, remove them
        if (!showSeconds) {
            // Remove seconds and AM/PM
            const parts = timeString.split(':');
            if (parts.length >= 2) {
                timeString = parts[0] + ':' + parts[1];
                
                // Add back AM/PM if in 12-hour format
                if (!use24HourFormat) {
                    const timeWithPeriod = date.toLocaleString('en-US', {
                        timeZone: timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                    
                    // Extract AM/PM from the formatted string
                    const match = timeWithPeriod.match(/\s(AM|PM)/);
                    if (match) {
                        timeString += ' ' + match[1];
                    }
                }
            }
        }
        
        return timeString;
    } catch (error) {
        console.error('Timezone error for ' + timezone + ':', error);
        return 'N/A';
    }
}

// Get header time
function updateHeaderTime() {
    const date = new Date();
    const weekday = date.toLocaleString('en-US', { weekday: 'short' });
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    
    let hours = date.getHours();
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    let ampm = '';
    
    if (!use24HourFormat) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
    }
    
    hours = String(hours).padStart(2, '0');
    
    const timeString = `${weekday}, ${month} ${day}, ${year} ${hours}:${minutes}:${seconds}${ampm ? ' ' + ampm : ''}`;
    document.getElementById('currentTime').textContent = timeString;
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
// Get current season (Northern/Southern hemisphere adjusted)
function getSeason(timezone) {
    const now = new Date();
    const month = now.getMonth();
    
    // Determine hemisphere from timezone
    const southernHemisphere = timezone.includes('Australia') || 
                                timezone.includes('Pacific') || 
                                (timezone.includes('America/Argentina') || 
                                 timezone.includes('America/Sao_Paulo'));
    
    let season;
    if (southernHemisphere) {
        // Southern hemisphere seasons are reversed
        if (month >= 11 || month <= 1) season = 'summer'; // Dec-Feb
        else if (month >= 2 && month <= 4) season = 'autumn'; // Mar-May
        else if (month >= 5 && month <= 7) season = 'winter'; // Jun-Aug
        else season = 'spring'; // Sep-Nov
    } else {
        // Northern hemisphere
        if (month >= 11 || month <= 1) season = 'winter'; // Dec-Feb
        else if (month >= 2 && month <= 4) season = 'spring'; // Mar-May
        else if (month >= 5 && month <= 7) season = 'summer'; // Jun-Aug
        else season = 'autumn'; // Sep-Nov
    }
    
    return season;
}

function getWeatherInfo(timezone, cityName) {
    const isDaytime = isDayTime(timezone);
    const season = getSeason(timezone);
    const icons = {
        sunny: '☀️',
        cloudy: '☁️',
        rainy: '🌧️',
        windy: '💨',
        night: '🌙',
        snow: '❄️'
    };
    
    // Base weather data with seasonal considerations
    const weatherData = {
        'london': { icon: icons.cloudy, winter: 6, spring: 10, summer: 17, autumn: 12, humidity: 75 },
        'new york': { icon: icons.cloudy, winter: -2, spring: 12, summer: 24, autumn: 15, humidity: 65 },
        'tokyo': { icon: icons.sunny, winter: 8, spring: 15, summer: 26, autumn: 19, humidity: 60 },
        'paris': { icon: icons.rainy, winter: 5, spring: 11, summer: 19, autumn: 13, humidity: 70 },
        'sydney': { icon: icons.sunny, winter: 17, spring: 22, summer: 27, autumn: 20, humidity: 55 },
        'dubai': { icon: icons.sunny, winter: 20, spring: 30, summer: 42, autumn: 32, humidity: 30 },
        'singapore': { icon: icons.rainy, winter: 26, spring: 27, summer: 29, autumn: 28, humidity: 80 },
        'hong kong': { icon: icons.cloudy, winter: 15, spring: 20, summer: 30, autumn: 24, humidity: 75 },
        'los angeles': { icon: icons.sunny, winter: 14, spring: 18, summer: 26, autumn: 22, humidity: 45 },
        'toronto': { icon: icons.cloudy, winter: -8, spring: 8, summer: 22, autumn: 12, humidity: 70 },
        'moscow': { icon: isDaytime ? icons.cloudy : icons.night, winter: -7, spring: 5, summer: 20, autumn: 8, humidity: 80 },
        'bangkok': { icon: icons.rainy, winter: 26, spring: 32, summer: 31, autumn: 28, humidity: 85 },
        'mexico city': { icon: icons.sunny, winter: 18, spring: 21, summer: 22, autumn: 20, humidity: 50 },
        'sao paulo': { icon: icons.rainy, winter: 20, spring: 24, summer: 28, autumn: 23, humidity: 75 },
        'auckland': { icon: icons.cloudy, winter: 14, spring: 18, summer: 23, autumn: 19, humidity: 65 },
        'cairo': { icon: icons.sunny, winter: 16, spring: 25, summer: 35, autumn: 28, humidity: 25 },
        'lagos': { icon: icons.rainy, winter: 26, spring: 28, summer: 25, autumn: 27, humidity: 70 },
        'buenos aires': { icon: icons.cloudy, winter: 12, spring: 17, summer: 26, autumn: 19, humidity: 60 },
        'lima': { icon: icons.cloudy, winter: 20, spring: 22, summer: 24, autumn: 22, humidity: 55 },
        'vancouver': { icon: icons.cloudy, winter: 3, spring: 9, summer: 19, autumn: 12, humidity: 75 },
        'chicago': { icon: icons.cloudy, winter: -5, spring: 10, summer: 23, autumn: 13, humidity: 65 },
        'denver': { icon: icons.sunny, winter: 4, spring: 12, summer: 26, autumn: 15, humidity: 40 },
        'seattle': { icon: icons.cloudy, winter: 5, spring: 10, summer: 22, autumn: 14, humidity: 70 },
        'miami': { icon: icons.sunny, winter: 20, spring: 23, summer: 29, autumn: 26, humidity: 75 },
        'boston': { icon: icons.cloudy, winter: -3, spring: 9, summer: 23, autumn: 12, humidity: 68 },
        'san francisco': { icon: icons.cloudy, winter: 10, spring: 12, summer: 18, autumn: 16, humidity: 65 },
        'berlin': { icon: icons.cloudy, winter: 2, spring: 9, summer: 20, autumn: 12, humidity: 70 },
        'madrid': { icon: icons.sunny, winter: 6, spring: 14, summer: 27, autumn: 18, humidity: 55 },
        'rome': { icon: icons.sunny, winter: 8, spring: 15, summer: 26, autumn: 19, humidity: 60 },
        'amsterdam': { icon: icons.cloudy, winter: 3, spring: 10, summer: 20, autumn: 13, humidity: 72 },
        'zurich': { icon: icons.cloudy, winter: 1, spring: 10, summer: 22, autumn: 13, humidity: 68 },
        'seoul': { icon: icons.cloudy, winter: -5, spring: 12, summer: 26, autumn: 16, humidity: 58 },
        'delhi': { icon: icons.sunny, winter: 15, spring: 28, summer: 38, autumn: 28, humidity: 45 },
        'istanbul': { icon: icons.cloudy, winter: 7, spring: 14, summer: 26, autumn: 19, humidity: 65 }
    };
    
    let data = weatherData[cityName.toLowerCase()];
    if (!data) {
        data = { 
            icon: isDaytime ? icons.sunny : icons.night, 
            winter: Math.floor(Math.random() * 15) + 5,
            spring: Math.floor(Math.random() * 15) + 15,
            summer: Math.floor(Math.random() * 15) + 25,
            autumn: Math.floor(Math.random() * 15) + 15,
            humidity: Math.floor(Math.random() * 40) + 50 
        };
    }
    
    // Get base temperature for current season
    const baseTemp = data[season];
    
    // Get local time for the city in this timezone
    const now = new Date();
    const timeStr = now.toLocaleString('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    // Parse the formatted string - only use hour and day (not seconds/minutes for stability)
    const parts = timeStr.match(/(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+)/);
    if (!parts) {
        return {
            icon: data.icon,
            temp: useFahrenheit ? '72°F' : '22°C',
            humidity: 60,
            season: season
        };
    }
    
    const hours = parseInt(parts[4]);
    const dayOfMonth = parseInt(parts[2]);
    const cacheKey = `${cityName}_${dayOfMonth}_${hours}`;
    
    // Check cache to prevent rapid fluctuations
    if (weatherCache[cacheKey]) {
        return weatherCache[cacheKey];
    }
    
    // Daily temperature cycle - warmer during midday, cooler at night
    // Uses cosine for smooth transitions
    const dailyCycle = Math.cos((hours - 14) * Math.PI / 12) * 5; // ±5°C centered at 14h (2PM)
    
    // Stable variation: based on day of month and hour only (no minutes or seconds)
    // This ensures same temperature throughout each hour
    const stableVariation = Math.sin((dayOfMonth + hours) * Math.PI / 12) * 2; // ±2°C
    
    // Combine variations - stable throughout the hour
    const temp = Math.round((baseTemp + dailyCycle + stableVariation) * 10) / 10;
    
    // Humidity: higher at night, lower during day
    const baseHumidity = data.humidity;
    const humidityDaily = Math.cos((hours - 14) * Math.PI / 12) * 12; // ±12%
    const humidityVariation = Math.sin((dayOfMonth + hours) * Math.PI / 12) * 3; // ±3%
    
    const humidity = Math.max(15, Math.min(100, Math.round(baseHumidity + humidityDaily + humidityVariation)));
    
    const tempF = Math.round((temp * 9/5) + 32);
    const tempDisplay = useFahrenheit ? `${tempF}°F` : `${temp}°C`;
    
    const result = {
        icon: data.icon,
        temp: tempDisplay,
        humidity: humidity,
        season: season
    };
    
    // Cache the result for this hour
    weatherCache[cacheKey] = result;
    
    return result;
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
            const seasonIcons = {
                'winter': '❄️',
                'spring': '🌸',
                'summer': '🌞',
                'autumn': '🍂'
            };
            const seasonIcon = seasonIcons[weather.season] || '📅';
            
            weatherHTML = `
                <div class="city-weather" data-city-name="${city.name}">
                    <div class="weather-item weather-temp" data-city="${city.name}">
                        <span class="weather-icon">🌡️</span>
                        <span>${weather.temp}</span>
                    </div>
                    <div class="weather-item weather-humidity" data-city="${city.name}">
                        <span class="weather-icon">💧</span>
                        <span>${weather.humidity}% Humidity</span>
                    </div>
                    <div class="weather-item weather-season" data-city="${city.name}">
                        <span class="weather-icon">${seasonIcon}</span>
                        <span>${weather.season.charAt(0).toUpperCase() + weather.season.slice(1)}</span>
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
    // Update all city cards with current time
    const cards = document.querySelectorAll('.city-card');
    
    cards.forEach((card) => {
        // Get city name from the card header
        const cityNameElement = card.querySelector('.city-name');
        if (!cityNameElement) return;
        
        const cityName = cityNameElement.textContent.trim();
        
        // Find the corresponding city in our cities array
        const city = cities.find(c => c.name === cityName);
        if (!city) return;
        
        // Update time
        const timeElement = card.querySelector('.city-time');
        if (timeElement) {
            timeElement.textContent = getTimeForCity(city.timezone);
        }
        
        // Update day/night indicator
        const periodElement = card.querySelector('.time-period');
        if (periodElement) {
            const dayTime = isDayTime(city.timezone);
            const periodText = dayTime ? '☀️ Day' : '🌙 Night';
            periodElement.textContent = periodText;
            periodElement.className = `time-period ${dayTime ? 'day' : 'night'}`;
        }
        
        // Update weather (temperature and humidity) in real-time
        if (showWeather) {
            const weather = getWeatherInfo(city.timezone, city.name);
            
            // Update temperature display
            const tempItem = card.querySelector('.weather-temp');
            if (tempItem) {
                const span = tempItem.querySelector('span:last-child');
                if (span) {
                    span.textContent = weather.temp;
                }
            }
            
            // Update humidity display
            const humidityItem = card.querySelector('.weather-humidity');
            if (humidityItem) {
                const span = humidityItem.querySelector('span:last-child');
                if (span) {
                    span.textContent = `${weather.humidity}% Humidity`;
                }
            }
            
            // Update season display
            const seasonIcons = {
                'winter': '❄️',
                'spring': '🌸',
                'summer': '🌞',
                'autumn': '🍂'
            };
            const seasonItem = card.querySelector('.weather-season');
            if (seasonItem) {
                const iconSpan = seasonItem.querySelector('span:first-child');
                const nameSpan = seasonItem.querySelector('span:last-child');
                if (iconSpan) {
                    iconSpan.textContent = seasonIcons[weather.season] || '📅';
                }
                if (nameSpan) {
                    nameSpan.textContent = weather.season.charAt(0).toUpperCase() + weather.season.slice(1);
                }
            }
        }
    });
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
    updateHeaderTime();
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
    
    // Get all city keys and filter by input
    const matches = Object.keys(citiesDatabase).filter(city => {
        // Check if city name includes input AND is not already added
        const isNotAdded = !cities.some(c => c.name.toLowerCase() === city.toLowerCase());
        return city.toLowerCase().includes(input) && isNotAdded;
    }).slice(0, 8);
    
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

    // Check if city already exists (case-insensitive)
    if (cities.some(c => c.name.toLowerCase() === cityName.toLowerCase())) {
        alert('This city is already added');
        input.value = '';
        return;
    }

    // Look up timezone (case-insensitive)
    const timezone = citiesDatabase[cityName.toLowerCase()];
    
    if (timezone) {
        // Properly capitalize city name (first letter uppercase, rest from input)
        const displayName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
        cities.push({ name: displayName, timezone: timezone });
        saveCitiesToStorage();
        renderCities();
        input.value = '';
        document.getElementById('addCityModal').classList.remove('show');
    } else {
        alert(`Timezone for "${cityName}" not found. Try one of the major cities or type part of the name to see suggestions.`);
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
