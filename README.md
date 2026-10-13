
# 🌍 WorldExplorer

WorldExplorer – individualus mokomasis internetinės
aplikacijos projektas, skirtas pasaulio valstybių
pažinimui ir asmeninio kelionių sąrašo kūrimui.

## Projekto tikslas

Sukurti modernią, patogią aplikaciją, kurioje
vartotojas galėtų ieškoti pasaulio valstybių,
peržiūrėti jų informaciją ir pažymėti aplankytas
arba norimas aplankyti valstybes.

## Naudojamos technologijos

- JavaScript
- React
- Vite
- CSS
- Supabase Database (PostgreSQL)
- Supabase Edge Functions
- REST Countries API v5
- Git ir GitHub

## MVP funkcionalumas

- Valstybių paieška pagal pavadinimą
- Valstybės vėliavos rodymas
- Sostinės, regiono ir gyventojų skaičiaus rodymas
- Valstybių žymėjimas kaip aplankytų
- Norimų aplankyti valstybių išsaugojimas
- Išsaugotų valstybių statuso keitimas
- Valstybių pašalinimas iš sąrašo
- Filtravimas pagal statusą
- Kelionių statistika
- Prisitaikantis Dark Explorer dizainas

## Aplikacijos veikimas

React frontend siunčia valstybių paieškos
užklausą į Supabase Edge Function
`get-countries`.

Ši funkcija naudoja REST Countries API v5
ir grąžina valstybių duomenis.

Išsaugotos valstybės laikomos Supabase
PostgreSQL duomenų bazėje.

Duomenų kūrimas, atnaujinimas ir trynimas
vykdomas per `manage-countries` Edge Function,
kuri tikrina administratoriaus slaptažodį.

## Duomenų bazė

Lentelė: `saved_countries`

| Laukas | Tipas | Paskirtis |
|---|---|---|
| id | UUID | Unikalus identifikatorius |
| country_code | TEXT | ISO valstybės kodas |
| status | TEXT | visited arba wishlist |
| created_at | TIMESTAMPTZ | Sukūrimo data |

Duomenų bazei naudojamas Row Level Security (RLS).

## Projekto paleidimas

Reikalinga Node.js ir npm aplinka.

1. Atsisiųsti projektą iš GitHub.
2. Terminale atidaryti projekto aplanką.
3. Įdiegti priklausomybes:

```bash
npm install
```

4. Sukurti `.env.local` failą:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

5. Paleisti projektą:

```bash
npm run dev
```

6. Atidaryti terminale pateiktą vietinį adresą.

Norint naudotis veikiančiomis API funkcijomis,
reikalingas sukonfigūruotas Supabase projektas,
Edge Functions ir REST Countries API raktas.

## Testavimas

Patikrintas šis funkcionalumas:

- Valstybių paieška
- API duomenų atvaizdavimas
- Valstybių išsaugojimas
- Statuso keitimas
- Valstybių filtravimas
- Duomenų išlikimas perkrovus puslapį
- Valstybių pašalinimas
- Klaidų apdorojimas

Visi 8 pagrindiniai MVP testai atlikti sėkmingai.

## Saugumas

Projektas skirtas mokymuisi ir demonstracijai.

- REST Countries API raktas saugomas
  Supabase Secrets.
- Supabase duomenų bazėje įjungtas RLS.
- Duomenų keitimui naudojama serverio funkcija.
- Administratoriaus slaptažodis tikrinamas
  serverio pusėje.
- `.env.local` nėra keliamas į GitHub.

Prieš viešą publikavimą būtina sustiprinti
autentifikaciją, užklausų ribojimą ir CORS
nustatymus.

## Projekto statusas

MVP sukurtas ir išbandytas.

Frontend dizainas: Dark Explorer.

Projekto tipas: individualus mokomasis projektas.
