
# WorldExplorer – AI agento instrukcijos

## 1. Projekto aprašymas

WorldExplorer – internetinė aplikacija, skirta pasaulio valstybėms pažinti ir asmeniniam kelionių sąrašui tvarkyti.

Pagrindinės funkcijos:
- Valstybių paieška pagal pavadinimą.
- Valstybės vėliavos, sostinės, regiono ir gyventojų skaičiaus rodymas.
- Vartotojų registracija ir prisijungimas.
- Aplankytų valstybių išsaugojimas.
- Norimų aplankyti valstybių išsaugojimas.
- Asmeninės kelionių statistikos rodymas.
- Išsaugotų valstybių filtravimas ir pašalinimas.

Valstybių paieška turi veikti be prisijungimo.

Norint išsaugoti valstybes, būtina prisijungti.

Registracija ir prisijungimas dar nėra įgyvendinti.

## 2. Naudojamos technologijos

- React – vartotojo sąsaja.
- Vite – projekto kūrimo ir paleidimo įrankis.
- JavaScript – programavimo kalba.
- CSS – svetainės dizainas.
- Supabase – duomenų bazė ir serverio paslaugos.
- Supabase Auth – vartotojų autentifikacija.
- PostgreSQL – duomenų bazė.
- Supabase Edge Functions – serverio funkcijos.
- REST Countries API v5 – valstybių informacija.
- GitHub – versijų valdymas.
- Vercel – svetainės publikavimas.

Nenaudoti papildomų bibliotekų ar technologijų, jeigu jos nėra būtinos.

## 3. Projekto struktūra

- src/App.jsx – pagrindinis aplikacijos komponentas.
- src/App.css – pagrindinio komponento stilius.
- src/index.css – bendrieji stiliai.
- src/supabaseClient.js – prisijungimas prie Supabase.
- src/CountryCard.jsx – valstybės informacijos kortelė.
- src/CountryCard.css – valstybės kortelės stilius.
- src/SavedCountryCard.jsx – išsaugotos valstybės kortelė.
- src/SavedCountryCard.css – išsaugotos kortelės stilius.
- src/CountryFilter.jsx – valstybių filtravimas.
- src/TravelStats.jsx – kelionių statistika.
- src/countryNames.js – valstybių pavadinimai lietuviškai.
- supabase/functions/ – serverio funkcijos.
- supabase/migrations/ – duomenų bazės migracijos.
- README.md – projekto dokumentacija.
- AGENTS.md – AI agento darbo instrukcijos.

Prieš keičiant failus būtina susipažinti su esama jų struktūra ir kodu.

## 4. Programavimo taisyklės

- Kodas turi būti kuo paprastesnis ir suprantamesnis.
- Naudoti React funkcinius komponentus.
- Būsenoms valdyti naudoti React Hooks.
- Dizainui naudoti įprastą CSS.
- Nekurti nereikalingų komponentų.
- Nekartoti to paties kodo be priežasties.
- Išsaugoti jau veikiančias funkcijas.
- Nekeisti su užduotimi nesusijusių failų.
- Netrinti esamų duomenų be leidimo.
- Užtikrinti, kad svetainė veiktų telefone.
- Klaidas pateikti vartotojui suprantama lietuvių kalba.

## 5. Vartotojų registracija ir prisijungimas

Vartotojų autentifikacijai naudoti Supabase Auth.

Numatytos funkcijos:
- Registracija el. paštu ir slaptažodžiu.
- Prisijungimas.
- Atsijungimas.
- Prisijungimo būsenos išsaugojimas.
- Asmeninio valstybių sąrašo valdymas.

Kol kas nekurti:
- Prisijungimo per Google.
- Socialinių tinklų prisijungimo.
- Profilio nuotraukų.
- Sudėtingų paskyros nustatymų.

Neregistruoti vartotojai gali ieškoti valstybių, tačiau negali jų išsaugoti.

## 6. Duomenų bazė ir saugumas

Naudojama Supabase PostgreSQL duomenų bazė.

Esama lentelė:
saved_countries

Lentelė šiuo metu nėra susieta su vartotojų paskyromis.

Įgyvendinant autentifikaciją:
- Kiekvienas įrašas turi priklausyti konkrečiam vartotojui.
- Naudoti vartotojo ID.
- Naudoti Row Level Security (RLS).
- Vartotojas turi matyti tik savo išsaugotas valstybes.
- Vartotojas gali keisti ir trinti tik savo įrašus.
- Nebenaudoti bendro administratoriaus slaptažodžio vartotojų veiksmams.

Duomenų bazės pakeitimus atlikti tik gavus leidimą.

Prieš migraciją įvertinti, kaip išsaugoti esamus įrašus.

## 7. Valstybių paieška

Valstybių informacija gaunama iš REST Countries API v5.

Naudojama Supabase Edge Function:
get-countries

Paieškos rezultatuose rodyti:
- Valstybės pavadinimą.
- Vėliavą.
- Sostinę.
- Regioną.
- Gyventojų skaičių.

Esamą API integraciją išsaugoti.

Slaptų API raktų nelaikyti React kode.

## 8. Dizaino reikalavimai

WorldExplorer turi atrodyti kaip profesionali kelionių platforma.

Pasirinktas dizainas:
- Tamsiai mėlynas fonas.
- Mėlyni ir violetiniai akcentai.
- Didelė hero sekcija su kelionių nuotrauka.
- Moderni navigacijos juosta.
- Didelis ir aiškus paieškos laukelis.
- Statistikos kortelės.
- Patrauklios valstybių kortelės.
- Suapvalinti kampai.
- Subtilūs šešėliai ir gradientai.
- Prisitaikymas prie mobiliųjų įrenginių.

Pagrindinis tekstas:
"Atrask pasaulį. Kurk savo istoriją."

Dizainą kurti pagal patvirtintą pirmąjį tamsų WorldExplorer maketą.

Visi vartotojui matomi tekstai turi būti lietuvių kalba.

## 9. Saugumo taisyklės

Niekada neviešinti:
- Supabase slaptųjų raktų.
- Service role rakto.
- REST Countries API rakto.
- Administratoriaus slaptažodžio.
- Kitų slaptų prisijungimo duomenų.

.env.local failo nekelti į GitHub.

VITE_SUPABASE_URL ir VITE_SUPABASE_PUBLISHABLE_KEY yra vieši React aplinkos kintamieji.

Kiekvieno vartotojo duomenis apsaugoti naudojant Supabase Auth ir RLS.

## 10. GitHub ir Vercel

Projektas saugomas GitHub.

Svetainė publikuojama naudojant Vercel.

Serverio funkcijos veikia Supabase aplinkoje.

Prieš publikavimą:
- Patikrinti, ar projektas sėkmingai sukompiliuojamas.
- Patikrinti aplinkos kintamuosius.
- Patikrinti Supabase ryšį.
- Patikrinti CORS nustatymus.
- Patikrinti prisijungimą.
- Patikrinti valstybių paiešką ir išsaugojimą.
- Patikrinti veikimą telefone.

Nevertinti publikavimo kaip sėkmingo vien pagal Vercel pranešimą – būtina patikrinti veikiančią svetainę.

## 11. AI agento darbo tvarka

Projekto kūrėjas mokosi programuoti.

Todėl AI agentas turi:
1. Dirbti mažais žingsniais.
2. Paaiškinti, ką planuoja keisti.
3. Nurodyti keičiamus failus.
4. Nekeičiant išsaugoti jau veikiančias funkcijas.
5. Paaiškinti, kaip patikrinti rezultatą.
6. Prieš svarbius pakeitimus paprašyti patvirtinimo.
7. Nevartoti nereikalingų sudėtingų terminų.
8. Naujas sąvokas paaiškinti paprastai.
9. Bendrauti lietuvių kalba.

Kai prašoma pateikti kodą, pirmenybę teikti visam failo kodui, o ne atskiriems fragmentams.

Vienu metu atlikti tik vieną aiškiai apibrėžtą užduotį.

## 12. Pagrindinis tikslas

Sukurti paprastą, veikiančią ir profesionaliai atrodančią WorldExplorer aplikaciją.

Prioritetai:
1. Veikiančios pagrindinės funkcijos.
2. Vartotojų duomenų saugumas.
3. Paprasta kodo struktūra.
4. Profesionalus dizainas.
5. Patogus naudojimas telefone.

Nekurti papildomų funkcijų, kol nebaigtos pagrindinės.
