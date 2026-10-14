
const lithuanianNames = new Intl.DisplayNames(
  ["lt"],
  { type: "region" }
);

const englishNames = new Intl.DisplayNames(
  ["en"],
  { type: "region" }
);

// Dažniausiai naudojami trumpiniai ir pavadinimai
const aliases = {
  jav: "United States",
  usa: "United States",
  uk: "United Kingdom",
  jk: "United Kingdom",
  dbr: "United Kingdom",
  olandija: "Netherlands",
  čekija: "Czechia",
  čekijosrespublika: "Czechia",
  pietukorėja: "South Korea",
  siaureskoreja: "North Korea",
  pietųkorėja: "South Korea",
  šiaurėskorėja: "North Korea",
  jape: "Japan",
};

// Suvienodiname pavadinimus paieškai
function normalizeText(value) {
  return String(value)
    .trim()
    .toLocaleLowerCase("lt")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

// Sudarome lietuviškų ir angliškų pavadinimų žodyną
const countrySearchMap = new Map();

for (let first = 65; first <= 90; first++) {
  for (let second = 65; second <= 90; second++) {
    const code = String.fromCharCode(first, second);

    try {
      const nameLt = lithuanianNames.of(code);
      const nameEn = englishNames.of(code);

      if (
        !nameLt ||
        !nameEn ||
        nameLt === code ||
        nameEn === code
      ) {
        continue;
      }

      countrySearchMap.set(
        normalizeText(nameLt),
        nameEn
      );

      countrySearchMap.set(
        normalizeText(nameEn),
        nameEn
      );
    } catch {
      // Praleidžiame nežinomus regionų kodus
    }
  }
}

// Papildomi dažni pavadinimai
for (const [name, englishName] of Object.entries(aliases)) {
  countrySearchMap.set(
    normalizeText(name),
    englishName
  );
}

// Valstybės pavadinimas lietuviškai
export function getCountryName(code) {
  if (!code || typeof code !== "string") {
    return "Nežinoma valstybė";
  }

  try {
    return (
      lithuanianNames.of(code.toUpperCase()) ||
      code
    );
  } catch {
    return code;
  }
}

// Paieškos tekstas, tinkamas REST Countries API
export function getSearchName(input) {
  if (!input || typeof input !== "string") {
    return "";
  }

  const cleanInput = input.trim();
  const normalized = normalizeText(cleanInput);

  return countrySearchMap.get(normalized) || cleanInput;
}
