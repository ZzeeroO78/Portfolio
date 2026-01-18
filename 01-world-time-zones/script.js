// Extended cities database with 766 cities
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
    'seoul': 'Asia/Seoul',
    'delhi': 'Asia/Kolkata',
    'prague': 'Europe/Prague',
    'budapest': 'Europe/Budapest',
    'warsaw': 'Europe/Warsaw',
    'athens': 'Europe/Athens',
    'istanbul': 'Europe/Istanbul',
    'moscow': 'Europe/Moscow',
    'seoul': 'Asia/Seoul',
    'bangkok': 'Asia/Bangkok',
    'hong kong': 'Asia/Hong_Kong',
    'singapore': 'Asia/Singapore',
    'kuala lumpur': 'Asia/Kuala_Lumpur',
    'manila': 'Asia/Manila',
    'jakarta': 'Asia/Jakarta',
    'hanoi': 'Asia/Ho_Chi_Minh',
    'ho chi minh': 'Asia/Ho_Chi_Minh',
    'penang': 'Asia/Kuala_Lumpur',
    'phuket': 'Asia/Bangkok',
    'bali': 'Asia/Jakarta',
    'chiang mai': 'Asia/Bangkok',
    'krabi': 'Asia/Bangkok',
    'pattaya': 'Asia/Bangkok',
    'nha trang': 'Asia/Ho_Chi_Minh',
    'danang': 'Asia/Ho_Chi_Minh',
    'hue': 'Asia/Ho_Chi_Minh',
    'can tho': 'Asia/Ho_Chi_Minh',
    'haiphong': 'Asia/Ho_Chi_Minh',
    'ha long': 'Asia/Ho_Chi_Minh',
    'sapa': 'Asia/Ho_Chi_Minh',
    'qingdao': 'Asia/Shanghai',
    'guangzhou': 'Asia/Shanghai',
    'shenzhen': 'Asia/Shanghai',
    'chongqing': 'Asia/Shanghai',
    'chengdu': 'Asia/Shanghai',
    'wuhan': 'Asia/Shanghai',
    'xi\'an': 'Asia/Shanghai',
    'beijing': 'Asia/Shanghai',
    'tianjin': 'Asia/Shanghai',
    'hangzhou': 'Asia/Shanghai',
    'suzhou': 'Asia/Shanghai',
    'nanjing': 'Asia/Shanghai',
    'changsha': 'Asia/Shanghai',
    'guilin': 'Asia/Shanghai',
    'kunming': 'Asia/Shanghai',
    'lhasa': 'Asia/Shanghai',
    'urumqi': 'Asia/Shanghai',
    'xining': 'Asia/Shanghai',
    'lanzhou': 'Asia/Shanghai',
    'taiyuan': 'Asia/Shanghai',
    'zhengzhou': 'Asia/Shanghai',
    'jinan': 'Asia/Shanghai',
    'shenyang': 'Asia/Shanghai',
    'harbin': 'Asia/Shanghai',
    'changchun': 'Asia/Shanghai',
    'hohhot': 'Asia/Shanghai',
    'yinchuan': 'Asia/Shanghai',
    'dehli': 'Asia/Kolkata',
    'bangalore': 'Asia/Kolkata',
    'mumbai': 'Asia/Kolkata',
    'delhi': 'Asia/Kolkata',
    'hyderabad': 'Asia/Kolkata',
    'kolkata': 'Asia/Kolkata',
    'chennai': 'Asia/Kolkata',
    'pune': 'Asia/Kolkata',
    'ahmedabad': 'Asia/Kolkata',
    'jaipur': 'Asia/Kolkata',
    'lucknow': 'Asia/Kolkata',
    'kanpur': 'Asia/Kolkata',
    'nagpur': 'Asia/Kolkata',
    'indore': 'Asia/Kolkata',
    'thane': 'Asia/Kolkata',
    'bhopal': 'Asia/Kolkata',
    'visakhapatnam': 'Asia/Kolkata',
    'patna': 'Asia/Kolkata',
    'vadodara': 'Asia/Kolkata',
    'ghaziabad': 'Asia/Kolkata',
    'ludhiana': 'Asia/Kolkata',
    'agra': 'Asia/Kolkata',
    'nasik': 'Asia/Kolkata',
    'faridabad': 'Asia/Kolkata',
    'meerut': 'Asia/Kolkata',
    'rajkot': 'Asia/Kolkata',
    'varanasi': 'Asia/Kolkata',
    'srinagar': 'Asia/Kolkata',
    'aurangabad': 'Asia/Kolkata',
    'dhanbad': 'Asia/Kolkata',
    'amritsar': 'Asia/Kolkata',
    'navi mumbai': 'Asia/Kolkata',
    'allahabad': 'Asia/Kolkata',
    'ranchi': 'Asia/Kolkata',
    'howrah': 'Asia/Kolkata',
    'coimbatore': 'Asia/Kolkata',
    'jabalpur': 'Asia/Kolkata',
    'guwahati': 'Asia/Kolkata',
    'tokyo': 'Asia/Tokyo',
    'yokohama': 'Asia/Tokyo',
    'osaka': 'Asia/Tokyo',
    'kyoto': 'Asia/Tokyo',
    'kobe': 'Asia/Tokyo',
    'kawasaki': 'Asia/Tokyo',
    'saitama': 'Asia/Tokyo',
    'chiba': 'Asia/Tokyo',
    'fukuoka': 'Asia/Tokyo',
    'kita-kyushu': 'Asia/Tokyo',
    'sapporo': 'Asia/Tokyo',
    'hiroshima': 'Asia/Tokyo',
    'sendai': 'Asia/Tokyo',
    'nagoya': 'Asia/Tokyo',
    'hamamatsu': 'Asia/Tokyo',
    'niigata': 'Asia/Tokyo',
    'shizuoka': 'Asia/Tokyo',
    'okayama': 'Asia/Tokyo',
    'kumamoto': 'Asia/Tokyo',
    'kagoshima': 'Asia/Tokyo',
    'matsuyama': 'Asia/Tokyo',
    'takamatsu': 'Asia/Tokyo',
    'oita': 'Asia/Tokyo',
    'miyazaki': 'Asia/Tokyo',
    'shiga': 'Asia/Tokyo',
    'toyama': 'Asia/Tokyo',
    'nagano': 'Asia/Tokyo',
    'gifu': 'Asia/Tokyo',
    'mie': 'Asia/Tokyo',
    'wakayama': 'Asia/Tokyo',
    'nara': 'Asia/Tokyo',
    'hyogo': 'Asia/Tokyo',
    'osaka': 'Asia/Tokyo',
    'new york': 'America/New_York',
    'los angeles': 'America/Los_Angeles',
    'chicago': 'America/Chicago',
    'houston': 'America/Chicago',
    'phoenix': 'America/Phoenix',
    'philadelphia': 'America/New_York',
    'san antonio': 'America/Chicago',
    'san diego': 'America/Los_Angeles',
    'dallas': 'America/Chicago',
    'san jose': 'America/Los_Angeles',
    'austin': 'America/Chicago',
    'jacksonville': 'America/New_York',
    'fort worth': 'America/Chicago',
    'columbus': 'America/New_York',
    'charlotte': 'America/New_York',
    'san francisco': 'America/Los_Angeles',
    'indianapolis': 'America/Indiana/Indianapolis',
    'austin': 'America/Chicago',
    'detroit': 'America/Detroit',
    'memphis': 'America/Chicago',
    'boston': 'America/New_York',
    'seattle': 'America/Los_Angeles',
    'denver': 'America/Denver',
    'washington': 'America/New_York',
    'nashville': 'America/Chicago',
    'baltimore': 'America/New_York',
    'louisville': 'America/Kentucky/Louisville',
    'portland': 'America/Los_Angeles',
    'oklahoma city': 'America/Chicago',
    'las vegas': 'America/Los_Angeles',
    'memphis': 'America/Chicago',
    'miami': 'America/New_York',
    'atlanta': 'America/New_York',
    'new orleans': 'America/Chicago',
    'minneapolis': 'America/Chicago',
    'tulsa': 'America/Chicago',
    'cleveland': 'America/New_York',
    'wichita': 'America/Chicago',
    'arlington': 'America/Chicago',
    'new orleans': 'America/Chicago',
    'bakersfield': 'America/Los_Angeles',
    'tampa': 'America/New_York',
    'aurora': 'America/Denver',
    'anaheim': 'America/Los_Angeles',
    'santa ana': 'America/Los_Angeles',
    'st louis': 'America/Chicago',
    'riverside': 'America/Los_Angeles',
    'corpus christi': 'America/Chicago',
    'lexington': 'America/Kentucky/Louisville',
    'henderson': 'America/Los_Angeles',
    'stockton': 'America/Los_Angeles',
    'cincinnati': 'America/New_York',
    'saint paul': 'America/Chicago',
    'greensboro': 'America/New_York',
    'plano': 'America/Chicago',
    'durham': 'America/New_York',
    'baton rouge': 'America/Chicago',
    'irving': 'America/Chicago',
    'garland': 'America/Chicago',
    'glendale': 'America/Phoenix',
    'laredo': 'America/Chicago',
    'scottsdale': 'America/Phoenix',
    'gilbert': 'America/Phoenix',
    'winston salem': 'America/New_York',
    'chandler': 'America/Phoenix',
    'fontana': 'America/Los_Angeles',
    'moreno valley': 'America/Los_Angeles',
    'madison': 'America/Chicago',
    'san bernardino': 'America/Los_Angeles',
    'fremont': 'America/Los_Angeles',
    'modesto': 'America/Los_Angeles',
    'little rock': 'America/Chicago',
    'shreveport': 'America/Chicago',
    'fayetteville': 'America/Chicago',
    'huntsville': 'America/Chicago',
    'amarillo': 'America/Chicago',
    'glendale': 'America/Los_Angeles',
    'garland': 'America/Chicago',
    'montgomery': 'America/Chicago',
    'salt lake city': 'America/Denver',
    'birmingham': 'America/Chicago',
    'buffalo': 'America/New_York',
    'las vegas': 'America/Los_Angeles',
    'san antonio': 'America/Chicago',
    'charlotte': 'America/New_York',
    'memphis': 'America/Chicago',
    'detroit': 'America/Detroit',
    'portland': 'America/Los_Angeles',
    'orlando': 'America/New_York',
    'vancouver': 'America/Vancouver',
    'montreal': 'America/Toronto',
    'calgary': 'America/Edmonton',
    'ottawa': 'America/Toronto',
    'edmonton': 'America/Edmonton',
    'winnipeg': 'America/Winnipeg',
    'quebec city': 'America/Toronto',
    'hamilton': 'America/Toronto',
    'vancouver': 'America/Vancouver',
    'london': 'Europe/London',
    'manchester': 'Europe/London',
    'birmingham': 'Europe/London',
    'leeds': 'Europe/London',
    'glasgow': 'Europe/London',
    'edinburgh': 'Europe/London',
    'bristol': 'Europe/London',
    'coventry': 'Europe/London',
    'liverpool': 'Europe/London',
    'newcastle': 'Europe/London',
    'sheffield': 'Europe/London',
    'nottingham': 'Europe/London',
    'leicester': 'Europe/London',
    'sunderland': 'Europe/London',
    'brighton': 'Europe/London',
    'oxford': 'Europe/London',
    'cambridge': 'Europe/London',
    'york': 'Europe/London',
    'cardiff': 'Europe/London',
    'belfast': 'Europe/London',
    'paris': 'Europe/Paris',
    'marseille': 'Europe/Paris',
    'lyon': 'Europe/Paris',
    'toulouse': 'Europe/Paris',
    'nice': 'Europe/Paris',
    'nantes': 'Europe/Paris',
    'strasbourg': 'Europe/Paris',
    'bordeaux': 'Europe/Paris',
    'lille': 'Europe/Paris',
    'rennes': 'Europe/Paris',
    'reims': 'Europe/Paris',
    'le havre': 'Europe/Paris',
    'saint-etienne': 'Europe/Paris',
    'toulon': 'Europe/Paris',
    'grenoble': 'Europe/Paris',
    'angers': 'Europe/Paris',
    'dijon': 'Europe/Paris',
    'brest': 'Europe/Paris',
    'nimes': 'Europe/Paris',
    'limoges': 'Europe/Paris',
    'perpignan': 'Europe/Paris',
    'berlin': 'Europe/Berlin',
    'munich': 'Europe/Berlin',
    'frankfurt': 'Europe/Berlin',
    'cologne': 'Europe/Berlin',
    'hamburg': 'Europe/Berlin',
    'dusseldorf': 'Europe/Berlin',
    'dortmund': 'Europe/Berlin',
    'essen': 'Europe/Berlin',
    'leipzig': 'Europe/Berlin',
    'dresden': 'Europe/Berlin',
    'hanover': 'Europe/Berlin',
    'nuremberg': 'Europe/Berlin',
    'duisburg': 'Europe/Berlin',
    'bochum': 'Europe/Berlin',
    'wuppertal': 'Europe/Berlin',
    'gelsenkirchen': 'Europe/Berlin',
    'mannheim': 'Europe/Berlin',
    'augsburg': 'Europe/Berlin',
    'aachen': 'Europe/Berlin',
    'mönchengladbach': 'Europe/Berlin',
    'madrid': 'Europe/Madrid',
    'barcelona': 'Europe/Madrid',
    'valencia': 'Europe/Madrid',
    'seville': 'Europe/Madrid',
    'zaragoza': 'Europe/Madrid',
    'malaga': 'Europe/Madrid',
    'murcia': 'Europe/Madrid',
    'palma': 'Europe/Madrid',
    'bilbao': 'Europe/Madrid',
    'alicante': 'Europe/Madrid',
    'cordoba': 'Europe/Madrid',
    'valladolid': 'Europe/Madrid',
    'vigo': 'Europe/Madrid',
    'gijon': 'Europe/Madrid',
    'alcala de henares': 'Europe/Madrid',
    'benidorm': 'Europe/Madrid',
    'cartagena': 'Europe/Madrid',
    'jerez': 'Europe/Madrid',
    'almeria': 'Europe/Madrid',
    'cadiz': 'Europe/Madrid',
    'huelva': 'Europe/Madrid',
    'rome': 'Europe/Rome',
    'milan': 'Europe/Rome',
    'naples': 'Europe/Rome',
    'turin': 'Europe/Rome',
    'palermo': 'Europe/Rome',
    'genoa': 'Europe/Rome',
    'bologna': 'Europe/Rome',
    'florence': 'Europe/Rome',
    'venice': 'Europe/Rome',
    'verona': 'Europe/Rome',
    'messina': 'Europe/Rome',
    'padua': 'Europe/Rome',
    'trieste': 'Europe/Rome',
    'brescia': 'Europe/Rome',
    'parma': 'Europe/Rome',
    'modena': 'Europe/Rome',
    'reggio calabria': 'Europe/Rome',
    'perugia': 'Europe/Rome',
    'catania': 'Europe/Rome',
    'amsterdam': 'Europe/Amsterdam',
    'rotterdam': 'Europe/Amsterdam',
    'the hague': 'Europe/Amsterdam',
    'utrecht': 'Europe/Amsterdam',
    'eindhoven': 'Europe/Amsterdam',
    'groningen': 'Europe/Amsterdam',
    'tilburg': 'Europe/Amsterdam',
    'almere': 'Europe/Amsterdam',
    'breda': 'Europe/Amsterdam',
    'nijmegen': 'Europe/Amsterdam',
    'enschede': 'Europe/Amsterdam',
    'arnhem': 'Europe/Amsterdam',
    'haarlem': 'Europe/Amsterdam',
    'zaanstad': 'Europe/Amsterdam',
    'zwolle': 'Europe/Amsterdam',
    'maastricht': 'Europe/Amsterdam',
    'leeuwarden': 'Europe/Amsterdam',
    'leiden': 'Europe/Amsterdam',
    'oss': 'Europe/Amsterdam',
    'dordrecht': 'Europe/Amsterdam',
    'zurich': 'Europe/Zurich',
    'basel': 'Europe/Zurich',
    'geneva': 'Europe/Zurich',
    'bern': 'Europe/Zurich',
    'lausanne': 'Europe/Zurich',
    'lucerne': 'Europe/Zurich',
    'solothurn': 'Europe/Zurich',
    'aarau': 'Europe/Zurich',
    'lugano': 'Europe/Zurich',
    'bellinzona': 'Europe/Zurich',
    'thun': 'Europe/Zurich',
    'winterthur': 'Europe/Zurich',
    'st. gallen': 'Europe/Zurich',
    'schaffhausen': 'Europe/Zurich',
    'neuchatel': 'Europe/Zurich',
    'fribourg': 'Europe/Zurich',
    'montreux': 'Europe/Zurich',
    'vevey': 'Europe/Zurich',
    'nyon': 'Europe/Zurich',
    'yverdon-les-bains': 'Europe/Zurich',
    'prague': 'Europe/Prague',
    'brno': 'Europe/Prague',
    'ostrava': 'Europe/Prague',
    'plzen': 'Europe/Prague',
    'liberec': 'Europe/Prague',
    'olomouc': 'Europe/Prague',
    'ceske budejovice': 'Europe/Prague',
    'zlin': 'Europe/Prague',
    'kladno': 'Europe/Prague',
    'most': 'Europe/Prague',
    'pelhrimov': 'Europe/Prague',
    'jihlava': 'Europe/Prague',
    'teplice': 'Europe/Prague',
    'karvina': 'Europe/Prague',
    'frydek-mistek': 'Europe/Prague',
    'havlickuv brod': 'Europe/Prague',
    'pribram': 'Europe/Prague',
    'decin': 'Europe/Prague',
    'tachov': 'Europe/Prague',
    'budapest': 'Europe/Budapest',
    'debrecen': 'Europe/Budapest',
    'szeged': 'Europe/Budapest',
    'miskolc': 'Europe/Budapest',
    'pecs': 'Europe/Budapest',
    'gyor': 'Europe/Budapest',
    'kecskeme': 'Europe/Budapest',
    'szolnok': 'Europe/Budapest',
    'szekesfehervar': 'Europe/Budapest',
    'eger': 'Europe/Budapest',
    'nyiregyhaza': 'Europe/Budapest',
    'szombathely': 'Europe/Budapest',
    'tatabanya': 'Europe/Budapest',
    'salgotarjan': 'Europe/Budapest',
    'kaposvar': 'Europe/Budapest',
    'veszprem': 'Europe/Budapest',
    'baja': 'Europe/Budapest',
    'kiskozeg': 'Europe/Budapest',
    'oroslan': 'Europe/Budapest',
    'warsaw': 'Europe/Warsaw',
    'krakow': 'Europe/Warsaw',
    'wroclaw': 'Europe/Warsaw',
    'poznań': 'Europe/Warsaw',
    'gdansk': 'Europe/Warsaw',
    'szczecin': 'Europe/Warsaw',
    'warsaw': 'Europe/Warsaw',
    'łódź': 'Europe/Warsaw',
    'gdynia': 'Europe/Warsaw',
    'sopot': 'Europe/Warsaw',
    'torun': 'Europe/Warsaw',
    'bydgoszcz': 'Europe/Warsaw',
    'lublin': 'Europe/Warsaw',
    'radom': 'Europe/Warsaw',
    'kielce': 'Europe/Warsaw',
    'gliwice': 'Europe/Warsaw',
    'zabrze': 'Europe/Warsaw',
    'tychy': 'Europe/Warsaw',
    'bytom': 'Europe/Warsaw',
    'sydney': 'Australia/Sydney',
    'melbourne': 'Australia/Melbourne',
    'brisbane': 'Australia/Brisbane',
    'perth': 'Australia/Perth',
    'adelaide': 'Australia/Adelaide',
    'hobart': 'Australia/Hobart',
    'canberra': 'Australia/Sydney',
    'newcastle': 'Australia/Sydney',
    'wollongong': 'Australia/Sydney',
    'cairns': 'Australia/Brisbane',
    'townsville': 'Australia/Brisbane',
    'geelong': 'Australia/Melbourne',
    'gold coast': 'Australia/Brisbane',
    'sunshine coast': 'Australia/Brisbane',
    'ballarat': 'Australia/Melbourne',
    'bendigo': 'Australia/Melbourne',
    'albury': 'Australia/Sydney',
    'tamworth': 'Australia/Sydney',
    'armidale': 'Australia/Sydney',
    'coffs harbour': 'Australia/Sydney',
    'auckland': 'Pacific/Auckland',
    'wellington': 'Pacific/Auckland',
    'christchurch': 'Pacific/Auckland',
    'hamilton': 'Pacific/Auckland',
    'tauranga': 'Pacific/Auckland',
    'lower hutt': 'Pacific/Auckland',
    'dunedin': 'Pacific/Auckland',
    'palmerston north': 'Pacific/Auckland',
    'rotorua': 'Pacific/Auckland',
    'new plymouth': 'Pacific/Auckland',
    'napier': 'Pacific/Auckland',
    'hastings': 'Pacific/Auckland',
    'whangarei': 'Pacific/Auckland',
    'nelson': 'Pacific/Auckland',
    'paraparaumu': 'Pacific/Auckland',
    'kapiti': 'Pacific/Auckland',
    'rangitikei': 'Pacific/Auckland',
    'wairarapa': 'Pacific/Auckland',
    'taranaki': 'Pacific/Auckland',
    'cairo': 'Africa/Cairo',
    'alexandria': 'Africa/Cairo',
    'giza': 'Africa/Cairo',
    'aswan': 'Africa/Cairo',
    'luxor': 'Africa/Cairo',
    'hurghada': 'Africa/Cairo',
    'sharm el-sheikh': 'Africa/Cairo',
    'port said': 'Africa/Cairo',
    'ismailia': 'Africa/Cairo',
    'suez': 'Africa/Cairo',
    'mansoura': 'Africa/Cairo',
    'tanta': 'Africa/Cairo',
    'zagazig': 'Africa/Cairo',
    'minya': 'Africa/Cairo',
    'asyut': 'Africa/Cairo',
    'sohag': 'Africa/Cairo',
    'qena': 'Africa/Cairo',
    'damietta': 'Africa/Cairo',
    'rashid': 'Africa/Cairo',
    'lagos': 'Africa/Lagos',
    'kano': 'Africa/Lagos',
    'ibadan': 'Africa/Lagos',
    'abuja': 'Africa/Lagos',
    'benin city': 'Africa/Lagos',
    'calabar': 'Africa/Lagos',
    'portharcourt': 'Africa/Lagos',
    'zaria': 'Africa/Lagos',
    'Jos': 'Africa/Lagos',
    'maiduguri': 'Africa/Lagos',
    'warri': 'Africa/Lagos',
    'delta': 'Africa/Lagos',
    'osogbo': 'Africa/Lagos',
    'ilorin': 'Africa/Lagos',
    'owerri': 'Africa/Lagos',
    'enugu': 'Africa/Lagos',
    'abeokuta': 'Africa/Lagos',
    'akure': 'Africa/Lagos',
    'ado ekiti': 'Africa/Lagos',
    'buenos aires': 'America/Argentina/Buenos_Aires',
    'cordoba': 'America/Argentina/Cordoba',
    'rosario': 'America/Argentina/Buenos_Aires',
    'mendoza': 'America/Argentina/Mendoza',
    'la plata': 'America/Argentina/Buenos_Aires',
    'mar del plata': 'America/Argentina/Buenos_Aires',
    'san juan': 'America/Argentina/San_Juan',
    'tucuman': 'America/Argentina/Tucuman',
    'salta': 'America/Argentina/Salta',
    'jujuy': 'America/Argentina/Jujuy',
    'santiago del estero': 'America/Argentina/Catamarca',
    'catamarca': 'America/Argentina/Catamarca',
    'la rioja': 'America/Argentina/Catamarca',
    'rio cuarto': 'America/Argentina/Cordoba',
    'villa maria': 'America/Argentina/Cordoba',
    'bahia blanca': 'America/Argentina/Buenos_Aires',
    'san luis': 'America/Argentina/Catamarca',
    'ne quén': 'America/Argentina/Buenos_Aires',
    'villa regina': 'America/Argentina/Buenos_Aires',
    'brazavil': 'Africa/Brazzaville',
    'kinshasa': 'Africa/Kinshasa',
    'accra': 'Africa/Accra',
    'kumasi': 'Africa/Accra',
    'cape town': 'Africa/Johannesburg',
    'johannesburg': 'Africa/Johannesburg',
    'pretoria': 'Africa/Johannesburg',
    'durban': 'Africa/Johannesburg',
    'port elizabeth': 'Africa/Johannesburg',
    'bloemfontein': 'Africa/Johannesburg',
    'pietermaritzburg': 'Africa/Johannesburg',
    'witbank': 'Africa/Johannesburg',
    'springs': 'Africa/Johannesburg',
    'benoni': 'Africa/Johannesburg',
    'roodepoort': 'Africa/Johannesburg',
    'soweto': 'Africa/Johannesburg',
    'alexandra': 'Africa/Johannesburg',
    'eastrand': 'Africa/Johannesburg',
    'boksburg': 'Africa/Johannesburg',
    'alberton': 'Africa/Johannesburg',
    'lima': 'America/Lima',
    'arequipa': 'America/Lima',
    'trujillo': 'America/Lima',
    'chiclayo': 'America/Lima',
    'cusco': 'America/Lima',
    'tacna': 'America/Lima',
    'puno': 'America/Lima',
    'ayacucho': 'America/Lima',
    'huancayo': 'America/Lima',
    'ica': 'America/Lima',
    'nazca': 'America/Lima',
    'chincha': 'America/Lima',
    'huacho': 'America/Lima',
    'barranca': 'America/Lima',
    'huarmey': 'America/Lima',
    'casma': 'America/Lima',
    'supe': 'America/Lima',
    'chancay': 'America/Lima',
    'oyon': 'America/Lima',
    'toronto': 'America/Toronto',
    'vancouver': 'America/Vancouver',
    'calgary': 'America/Edmonton',
    'ottawa': 'America/Toronto',
    'edmonton': 'America/Edmonton',
    'winnipeg': 'America/Winnipeg',
    'quebec city': 'America/Toronto',
    'hamilton': 'America/Toronto',
    'london': 'America/Toronto',
    'kitchener': 'America/Toronto',
    'windsor': 'America/Toronto',
    'saskatoon': 'America/Regina',
    'regina': 'America/Regina',
    'halifax': 'America/Halifax',
    'st johns': 'America/St_Johns',
    'charlottetown': 'America/Halifax',
    'fredericton': 'America/Halifax',
    'moncton': 'America/Halifax',
    'mexico city': 'America/Mexico_City',
    'guadalajara': 'America/Mexico_City',
    'monterrey': 'America/Mexico_City',
    'cancun': 'America/Cancun',
    'playa del carmen': 'America/Cancun',
    'cozumel': 'America/Cancun',
    'merida': 'America/Mexico_City',
    'puebla': 'America/Mexico_City',
    'toluca': 'America/Mexico_City',
    'querétaro': 'America/Mexico_City',
    'león': 'America/Mexico_City',
    'irapuato': 'America/Mexico_City',
    'guanajuato': 'America/Mexico_City',
    'aguascalientes': 'America/Mexico_City',
    'san luis potosi': 'America/Mexico_City',
    'zacatecas': 'America/Mexico_City',
    'durango': 'America/Mexico_City',
    'chihuahua': 'America/Mexico_City',
    'hermosillo': 'America/Hermosillo',
    'navojoa': 'America/Hermosillo',
    'culiacan': 'America/Mexico_City',
    'mazatlan': 'America/Mexico_City',
    'puerto vallarta': 'America/Mexico_City',
    'acapulco': 'America/Mexico_City',
    'sao paulo': 'America/Sao_Paulo',
    'rio de janeiro': 'America/Sao_Paulo',
    'salvador': 'America/Bahia',
    'fortaleza': 'America/Fortaleza',
    'belo horizonte': 'America/Sao_Paulo',
    'brasilia': 'America/Sao_Paulo',
    'curitiba': 'America/Sao_Paulo',
    'porto alegre': 'America/Sao_Paulo',
    'manaus': 'America/Manaus',
    'belem': 'America/Belem',
    'recife': 'America/Recife',
    'maceio': 'America/Maceio',
    'teresina': 'America/Fortaleza',
    'sao luis': 'America/Fortaleza',
    'natal': 'America/Fortaleza',
    'joao pessoa': 'America/Fortaleza',
    'campinas': 'America/Sao_Paulo',
    'santos': 'America/Sao_Paulo',
    'sao bernardo do campo': 'America/Sao_Paulo',
    'santo andre': 'America/Sao_Paulo',
    'sao caetano do sul': 'America/Sao_Paulo',
    'diadema': 'America/Sao_Paulo',
    'ribeirao preto': 'America/Sao_Paulo',
    'sorocaba': 'America/Sao_Paulo',
    'piracicaba': 'America/Sao_Paulo',
    'campina grande': 'America/Fortaleza',
    'governador valadares': 'America/Sao_Paulo',
    'uberlandia': 'America/Sao_Paulo',
    'divinopolis': 'America/Sao_Paulo',
    'montes claros': 'America/Sao_Paulo',
    'varzea grande': 'America/Sao_Paulo',
    'cuiaba': 'America/Sao_Paulo',
    'dourados': 'America/Sao_Paulo',
    'corumba': 'America/Sao_Paulo',
    'buenos aires': 'America/Argentina/Buenos_Aires',
    'cordoba': 'America/Argentina/Cordoba',
    'rosario': 'America/Argentina/Buenos_Aires',
    'mendoza': 'America/Argentina/Mendoza',
    'istanbul': 'Europe/Istanbul',
    'ankara': 'Europe/Istanbul',
    'smyrna': 'Europe/Istanbul',
    'adana': 'Europe/Istanbul',
    'gaziantep': 'Europe/Istanbul',
    'bursa': 'Europe/Istanbul',
    'antalya': 'Europe/Istanbul',
    'konya': 'Europe/Istanbul',
    'diyarbakir': 'Europe/Istanbul',
    'kayseri': 'Europe/Istanbul',
    'samsun': 'Europe/Istanbul',
    'rize': 'Europe/Istanbul',
    'trebzon': 'Europe/Istanbul',
    'ankara': 'Europe/Istanbul',
    'kurtalan': 'Europe/Istanbul',
    'bodrum': 'Europe/Istanbul',
    'bodrum': 'Europe/Istanbul',
    'alanya': 'Europe/Istanbul',
    'marmaris': 'Europe/Istanbul',
    'istanbul': 'Europe/Istanbul',
    'moscow': 'Europe/Moscow',
    'st petersburg': 'Europe/Moscow',
    'novosibirsk': 'Asia/Novosibirsk',
    'yekaterinburg': 'Asia/Yekaterinburg',
    'nizhny novgorod': 'Europe/Moscow',
    'kazan': 'Europe/Moscow',
    'chelyabinsk': 'Asia/Yekaterinburg',
    'omsk': 'Asia/Omsk',
    'samara': 'Europe/Samara',
    'rostov-on-don': 'Europe/Moscow',
    'ufa': 'Europe/Moscow',
    'krasnoyarsk': 'Asia/Krasnoyarsk',
    'perm': 'Europe/Moscow',
    'voronezh': 'Europe/Moscow',
    'saratov': 'Europe/Saratov',
    'krasnodar': 'Europe/Moscow',
    'sochi': 'Europe/Moscow',
    'vladivostok': 'Asia/Vladivostok',
    'irkutsk': 'Asia/Irkutsk',
    'khabarovsk': 'Asia/Vladivostok',
    'magadan': 'Asia/Magadan',
    'petropavlovsk-kamchatsky': 'Asia/Kamchatka',
    'anadyr': 'Asia/Anadyr',
    'yuzhno-sakhalinsk': 'Asia/Sakhalin',
    'provideniya': 'Asia/Provideniya'
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
let sortMode = 'name';
let use24HourFormat = true;
let showSeconds = true;
let useFahrenheit = false;
let darkMode = false;
let showWeather = true;

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
    
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
}

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
    
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('show');
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });
    
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

function renderCities() {
    const grid = document.getElementById('citiesGrid');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    let filteredCities = cities.filter(city => 
        city.name.toLowerCase().includes(searchTerm)
    );

    if (sortMode === 'time') {
        filteredCities.sort((a, b) => {
            const timeA = getTimeForCity(a.timezone);
            const timeB = getTimeForCity(b.timezone);
            return timeA.localeCompare(timeB);
        });
    } else {
        filteredCities.sort((a, b) => a.name.localeCompare(b.name));
    }

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
}

function filterCities() {
    renderCities();
}

function toggleSort() {
    sortMode = sortMode === 'name' ? 'time' : 'name';
    document.getElementById('sortBtn').textContent = sortMode === 'time' 
        ? '📍 Sort by Name' 
        : '📊 Sort by Time';
    renderCities();
}

function toggleTimeFormat() {
    use24HourFormat = !use24HourFormat;
    document.getElementById('timeFormatBtn').textContent = use24HourFormat 
        ? '🕐 24H' 
        : '🕐 12H';
    saveSettings();
    updateTime();
}

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    saveSettings();
}

function openAddModal() {
    document.getElementById('addCityModal').classList.add('show');
    document.getElementById('cityInput').focus();
    document.getElementById('suggestions').innerHTML = '';
}

function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    document.getElementById('showWeather').checked = showWeather;
    document.getElementById('showSeconds').checked = showSeconds;
    document.getElementById('useF').checked = useFahrenheit;
    modal.classList.add('show');
}

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

function selectSuggestion(cityName) {
    document.getElementById('cityInput').value = cityName;
    document.getElementById('suggestions').innerHTML = '';
}

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

function removeCity(cityName) {
    cities = cities.filter(city => city.name !== cityName);
    saveCitiesToStorage();
    renderCities();
}

function resetToDefault() {
    if (confirm('Are you sure you want to reset to default cities?')) {
        cities = [...defaultCities];
        saveCitiesToStorage();
        renderCities();
    }
}

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

document.addEventListener('DOMContentLoaded', init);