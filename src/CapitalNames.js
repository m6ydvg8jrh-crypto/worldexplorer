
/*
  WorldExplorer – lietuviški sostinių pavadinimai
*/

const capitalNames = {
    // EUROPA
    Athens: "Atėnai",
    Rome: "Roma",
    Warsaw: "Varšuva",
    Vienna: "Viena",
    Prague: "Praha",
    London: "Londonas",
    Copenhagen: "Kopenhaga",
    Lisbon: "Lisabona",
    Madrid: "Madridas",
    Berlin: "Berlynas",
    Paris: "Paryžius",
    Brussels: "Briuselis",
    Amsterdam: "Amsterdamas",
    Luxembourg: "Liuksemburgas",
    Bern: "Bernas",
    Oslo: "Oslas",
    Stockholm: "Stokholmas",
    Helsinki: "Helsinkis",
    Reykjavik: "Reikjavikas",
    Dublin: "Dublinas",
    Tallinn: "Talinas",
    Riga: "Ryga",
    Vilnius: "Vilnius",
    Bratislava: "Bratislava",
    Budapest: "Budapeštas",
    Ljubljana: "Liubliana",
    Zagreb: "Zagrebas",
    Sarajevo: "Sarajevas",
    Belgrade: "Belgradas",
    Podgorica: "Podgorica",
    Tirana: "Tirana",
    Skopje: "Skopjė",
    Sofia: "Sofija",
    Bucharest: "Bukareštas",
    Chisinau: "Kišiniovas",
    "Chișinău": "Kišiniovas",
    Kyiv: "Kyjivas",
    Minsk: "Minskas",
    Moscow: "Maskva",
    Valletta: "Valeta",
    Nicosia: "Nikosija",
    Monaco: "Monakas",
    "Andorra la Vella": "Andora",
    Vaduz: "Vaducas",
    "San Marino": "San Marinas",
    "Vatican City": "Vatikanas",
    Pristina: "Priština",
  
    // AZIJA
    Tokyo: "Tokijas",
    Beijing: "Pekinas",
    Seoul: "Seulas",
    Pyongyang: "Pchenjanas",
    Bangkok: "Bankokas",
    Hanoi: "Hanojus",
    Jakarta: "Džakarta",
    Manila: "Manila",
    Singapore: "Singapūras",
    "Kuala Lumpur": "Kvala Lumpūras",
    "Phnom Penh": "Pnompenis",
    Vientiane: "Vientianas",
    Naypyidaw: "Neipidas",
    "New Delhi": "Naujasis Delis",
    Kathmandu: "Katmandu",
    Colombo: "Kolombas",
    Dhaka: "Daka",
    Islamabad: "Islamabadas",
    Kabul: "Kabulas",
    Tehran: "Teheranas",
    Baghdad: "Bagdadas",
    Riyadh: "Rijadas",
    Doha: "Doha",
    Manama: "Manama",
    Muscat: "Maskatas",
    "Abu Dhabi": "Abu Dabis",
    Jerusalem: "Jeruzalė",
    Amman: "Amanas",
    Beirut: "Beirutas",
    Damascus: "Damaskas",
    Ankara: "Ankara",
    Tbilisi: "Tbilisis",
    Yerevan: "Jerevanas",
    Baku: "Baku",
    Astana: "Astana",
    Tashkent: "Taškentas",
    Bishkek: "Biškekas",
    Dushanbe: "Dušanbė",
    Ashgabat: "Ašchabadas",
    Ulaanbaatar: "Ulan Batoras",
    Male: "Malė",
    "Malé": "Malė",
    Thimphu: "Timpu",
    Dili: "Dilis",
  
    // AMERIKA
    Washington: "Vašingtonas",
    "Washington, D.C.": "Vašingtonas",
    Ottawa: "Otava",
    "Mexico City": "Meksikas",
    Havana: "Havana",
    Kingston: "Kingstonas",
    Nassau: "Nasau",
    "Santo Domingo": "Santo Domingas",
    "San José": "San Chosė",
    "Panama City": "Panama",
    "Guatemala City": "Gvatemala",
    Managua: "Managva",
    Tegucigalpa: "Tegusigalpa",
    Belmopan: "Belmopanas",
    "San Salvador": "San Salvadoras",
    Brasília: "Brazilija",
    Brasilia: "Brazilija",
    "Buenos Aires": "Buenos Airės",
    Santiago: "Santjagas",
    Lima: "Lima",
    Bogotá: "Bogota",
    Quito: "Kitas",
    Caracas: "Karakasas",
    Montevideo: "Montevidėjas",
    Asunción: "Asunsjonas",
    "La Paz": "La Pasas",
    Sucre: "Sukrė",
    Georgetown: "Džordžtaunas",
    Paramaribo: "Paramaribas",
  
    // AFRIKA
    Cairo: "Kairas",
    Rabat: "Rabatas",
    Algiers: "Alžyras",
    Tunis: "Tunisas",
    Tripoli: "Tripolis",
    Nairobi: "Nairobis",
    "Addis Ababa": "Adis Abeba",
    Kampala: "Kampala",
    Kigali: "Kigalis",
    Dodoma: "Dodoma",
    Kinshasa: "Kinšasa",
    Brazzaville: "Brazavilis",
    Abuja: "Abudža",
    Accra: "Akra",
    Dakar: "Dakaras",
    Bamako: "Bamakas",
    Niamey: "Niamėjus",
    "N'Djamena": "Ndžamena",
    Khartoum: "Chartumas",
    Juba: "Džuba",
    Luanda: "Luanda",
    Lusaka: "Lusaka",
    Harare: "Hararė",
    Maputo: "Maputu",
    Gaborone: "Gaboronas",
    Windhoek: "Vindhukas",
    Pretoria: "Pretorija",
    "Cape Town": "Keiptaunas",
    Bloemfontein: "Blumfonteinas",
    Antananarivo: "Antananaryvas",
    "Port Louis": "Port Luisas",
    Victoria: "Viktorija",
  
    // OKEANIJA
    Canberra: "Kanbera",
    Wellington: "Velingtonas",
    Suva: "Suva",
    "Port Moresby": "Port Morsbis",
    Apia: "Apija",
    "Nuku'alofa": "Nukualofa",
    Honiara: "Honiara",
    "Port Vila": "Port Vila",
    Palikir: "Palikiras",
    Majuro: "Madžūras",
    Funafuti: "Funafutis",
    Tarawa: "Tarava",
    Ngerulmud: "Ngerulmudas",
  };
  
  function normalizeCapitalName(name) {
    return String(name)
      .trim()
      .toLocaleLowerCase("en")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
  
  const normalizedNames = new Map(
    Object.entries(capitalNames).map(
      ([name, translation]) => [
        normalizeCapitalName(name),
        translation,
      ]
    )
  );
  
  export function getCapitalName(name) {
    if (!name || typeof name !== "string") {
      return "Nenurodyta";
    }
  
    return (
      normalizedNames.get(normalizeCapitalName(name)) ||
      name
    );
  }
  