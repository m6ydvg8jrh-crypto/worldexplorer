
# 🌍 WorldExplorer

**WorldExplorer** – mokomasis internetinės aplikacijos projektas, skirtas pasaulio valstybių pažinimui ir asmeninių kelionių sąrašų kūrimui.

Vartotojai gali ieškoti pasaulio valstybių, peržiūrėti jų informaciją, žymėti aplankytas ir planuojamas aplankyti valstybes bei stebėti savo kelionių statistiką.

**Veikianti aplikacija:**  
https://worldexplorer-three.vercel.app

## 🎯 Projekto tikslas

Sukurti modernią, patogią ir mobiliems įrenginiams pritaikytą internetinę aplikaciją, kurioje vartotojas galėtų:

- Atrasti pasaulio valstybes.
- Peržiūrėti informaciją apie pasirinktas valstybes.
- Susikurti asmeninę paskyrą.
- Išsaugoti aplankytas ir norimas aplankyti valstybes.
- Valdyti savo kelionių sąrašą.
- Stebėti kelionių statistiką.

Projektas sukurtas mokymosi tikslais, naudojant React ir Supabase technologijas.

## 🛠️ Naudojamos technologijos

### Frontend
- **React** – vartotojo sąsajos kūrimui.
- **Vite** – projekto kūrimui ir kompiliavimui.
- **JavaScript** – aplikacijos logikai.
- **CSS** – dizainui ir prisitaikymui prie skirtingų ekranų.

### Backend ir duomenų bazė
- **Supabase PostgreSQL** – vartotojų kelionių duomenims saugoti.
- **Supabase Authentication** – registracijai ir prisijungimui.
- **Supabase Edge Functions** – serverio pusės API užklausoms.
- **Row Level Security (RLS)** – vartotojų duomenų atskyrimui.
- **REST Countries API v5** – pasaulio valstybių informacijai gauti.

### Versijų valdymas ir publikavimas
- **Git** – projekto versijų valdymui.
- **GitHub** – kodo saugojimui.
- **Vercel** – aplikacijos publikavimui internete.
- **Cursor** – programavimo aplinka.

## ✨ Pagrindinės funkcijos

### 1. Valstybių paieška

- Paieška pagal lietuviškus ir angliškus valstybių pavadinimus.
- Valstybių vėliavų atvaizdavimas.
- Sostinės rodymas.
- Regiono rodymas.
- Gyventojų skaičiaus rodymas.
- Valstybės ISO kodo rodymas.

Pavyzdžiui, vartotojas gali ieškoti „Graikija“ arba „Greece“.

### 2. Lietuviški pavadinimai

Aplikacijoje naudojami:

- Lietuviški valstybių pavadinimai.
- Lietuviški regionų pavadinimai.
- Lietuviški daugelio pasaulio sostinių pavadinimai.

Vertimams naudojami `Intl.DisplayNames` ir papildomi JavaScript žodynai.

### 3. Registracija ir prisijungimas

- Naujos paskyros sukūrimas.
- Prisijungimas el. paštu ir slaptažodžiu.
- Atsijungimas.
- Asmeninės vartotojo sesijos išsaugojimas.

Autentifikacijai naudojamas **Supabase Authentication**.

### 4. Asmeninis kelionių sąrašas

Prisijungęs vartotojas gali:

- Pažymėti valstybę kaip aplankytą.
- Įtraukti valstybę į norimų aplankyti sąrašą.
- Pakeisti valstybės statusą.
- Pašalinti valstybę.
- Matyti anksčiau išsaugotus įrašus.

Kiekvienas vartotojas gali pasiekti tik savo duomenis.

### 5. Filtravimas

Valstybės filtruojamos pagal tris kategorijas:

- **Visos** – visi išsaugoti įrašai.
- **Aplankytos** – jau aplankytos valstybės.
- **Planuojamos** – norimos aplankyti valstybės.

### 6. Kelionių statistika

Aplikacija pateikia:

- Aplankytų valstybių skaičių.
- Planuojamų aplankyti valstybių skaičių.
- Bendrą išsaugotų valstybių skaičių.

### 7. Prisitaikantis dizainas

WorldExplorer naudoja tamsų **Dark Explorer** dizainą.

Pagrindiniai dizaino elementai:

- Navigacijos juosta.
- Hero sekcija su panoramine nuotrauka.
- Valstybių informacijos kortelės.
- Kelionių statistikos kortelės.
- Valstybių filtrai.
- Prisijungimo ir registracijos langas.

Dizainas pritaikytas kompiuteriams, planšetėms ir telefonams.

## ⚙️ Aplikacijos veikimo principas

Valstybių paieška veikia tokia seka:

1. Vartotojas įveda valstybės pavadinimą.
2. React aplikacija prireikus pakeičia lietuvišką pavadinimą į API suprantamą variantą.
3. Užklausa siunčiama į Supabase Edge Function `get-countries`.
4. Edge Function kreipiasi į REST Countries API v5.
5. Gautas rezultatas perduodamas React aplikacijai.
6. Vartotojui parodoma valstybės informacijos kortelė.

Asmeninių kelionių duomenys valdomi kitaip:

1. Vartotojas prisijungia per Supabase Authentication.
2. React aplikacija kreipiasi į Supabase duomenų bazę.
3. RLS taisyklės apriboja prieigą pagal vartotojo ID.
4. Vartotojas mato ir keičia tik savo įrašus.

## 🗄️ Duomenų bazė

Naudojama PostgreSQL lentelė:

`saved_countries`

| Laukas | Tipas | Paskirtis |
|---|---|---|
| id | UUID | Unikalus įrašo identifikatorius |
| user_id | UUID | Prisijungusio vartotojo ID |
| country_code | TEXT | ISO valstybės kodas |
| status | TEXT | `visited` arba `wishlist` |
| created_at | TIMESTAMPTZ | Įrašo sukūrimo laikas |

Duomenų bazėje įjungtas **Row Level Security (RLS)**.

RLS taisyklės leidžia prisijungusiam vartotojui skaityti, pridėti, atnaujinti ir trinti tik savo įrašus.

Vienas vartotojas gali turėti vieną įrašą konkrečiai valstybei, tačiau ta pati valstybė gali būti išsaugota skirtingų vartotojų sąrašuose.

Pradinė duomenų bazės schema pateikta faile:

`supabase/migrations/001_create_saved_countries.sql`

## 📁 Projekto struktūra

```text
worldexplorer/
├── public/
│   └── worldexplorer-europe-hero.png
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── Auth.jsx
│   ├── Auth.css
│   ├── CountryCard.jsx
│   ├── CountryCard.css
│   ├── CountryFilter.jsx
│   ├── CountryFilter.css
│   ├── CountryNames.js
│   ├── CapitalNames.js
│   ├── SavedCountryCard.jsx
│   ├── SavedCountryCard.css
│   ├── TravelStats.jsx
│   ├── TravelStats.css
│   ├── supabaseClient.js
│   ├── index.css
│   └── main.jsx
│
├── supabase/
│   ├── functions/
│   │   └── get-countries/
│   │       └── index.ts
│   └── migrations/
│       └── 001_create_saved_countries.sql
│
├── AGENTS.MD
├── package.json
├── index.html
└── README.md
```

## 🚀 Projekto paleidimas

### Reikalavimai

Kompiuteryje turi būti įdiegta:

- Node.js
- npm
- Git

### 1. Atsisiųskite projektą

```bash
git clone <REPOSITORY_URL>
```

`<REPOSITORY_URL>` pakeiskite tikru GitHub saugyklos adresu.

### 2. Atidarykite projekto aplanką

```bash
cd worldexplorer
```

Aplanko pavadinimas priklauso nuo atsisiųstos saugyklos pavadinimo.

### 3. Įdiekite priklausomybes

```bash
npm install
```

Ši komanda įdiegia projekto bibliotekas pagal `package.json`.

### 4. Sukurkite `.env.local`

Pagrindiniame projekto aplanke sukurkite failą:

`.env.local`

Įrašykite:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

Reikšmes pakeiskite savo Supabase projekto duomenimis.

**Svarbu:** `VITE_` kintamieji pasiekiami naršyklėje, todėl čia galima naudoti tik viešąjį Supabase raktą. Slaptųjų raktų ir administratoriaus prisijungimo duomenų įrašyti negalima.

### 5. Paleiskite aplikaciją

```bash
npm run dev
```

Terminale bus pateiktas vietinis adresas, paprastai:

`http://localhost:5173`

Atidarykite jį naršyklėje.

### 6. Sukurkite produkcinę versiją

```bash
npm run build
```

Ši komanda sukuria optimizuotus aplikacijos failus `dist` aplanke.

## ☁️ Supabase konfigūracija

Norint paleisti projektą su atskiru Supabase projektu, reikia:

1. Sukurti Supabase projektą.
2. Paruošti `saved_countries` lentelę ir RLS taisykles.
3. Sukonfigūruoti Supabase Authentication.
4. Publikuoti `get-countries` Edge Function.
5. Supabase Secrets saugykloje nustatyti `REST_COUNTRIES_API_KEY`.
6. Pridėti naudojamą svetainės adresą prie Edge Function CORS leidžiamų adresų.
7. Sukonfigūruoti frontend aplinkos kintamuosius.

**Pastaba:** esamos duomenų bazės nereikėtų atkurti iš pradinės SQL schemos, jeigu lentelės ir taisyklės jau sukurtos. Pradinė schema skirta naujam projektui.

## 🔐 Saugumas

Projekte taikomos šios priemonės:

- Vartotojų autentifikacija per Supabase Authentication.
- Prieigos prie įrašų ribojimas per RLS.
- API rakto laikymas Supabase Secrets.
- Viešojo ir slaptojo API rakto atskyrimas.
- `.env.local` neįtraukiamas į GitHub.
- Edge Function naudojamas leidžiamų CORS adresų sąrašas.
- Pašalinta anksčiau naudota administratoriaus slaptažodžiu apsaugota `manage-countries` funkcija.

Projektas yra mokomasis. Prieš platesnį viešą naudojimą papildomai rekomenduojama įjungti el. pašto patvirtinimą, užklausų ribojimą ir atlikti saugumo testus.

## 🧪 Testavimas

Kūrimo metu patikrinta:

- Valstybių paieška lietuvių ir anglų kalbomis.
- Valstybių informacijos rodymas.
- Lietuviški valstybių ir sostinių pavadinimai.
- Registracija ir prisijungimas.
- Atsijungimas.
- Asmeninių valstybių išsaugojimas.
- Valstybių statuso keitimas.
- Įrašų pašalinimas.
- Filtravimas.
- Kelionių statistika.
- Skirtingų vartotojų duomenų atskyrimas.
- Produkcinis kompiliavimas su `npm run build`.
- Valstybių paieška Vercel svetainėje.

## 🌐 Publikavimas

Projekto kodas saugomas GitHub.

Aplikacija publikuota naudojant Vercel, o backend funkcijos ir duomenų bazė veikia Supabase aplinkoje.

**WorldExplorer:**  
https://worldexplorer-three.vercel.app

## 📌 Projekto statusas

**MVP sukurtas ir veikia.**

Projektas skirtas praktiniam React, JavaScript, Supabase, GitHub ir Vercel technologijų mokymuisi.

Galimos tolesnės plėtros kryptys:

- Interaktyvus pasaulio žemėlapis.
- Valstybių paieškos pasiūlymai įvedant tekstą.
- Kelionių nuotraukų pridėjimas.
- Aplankytų valstybių žymėjimas žemėlapyje.
- Papildoma vartotojo profilio informacija.
```
