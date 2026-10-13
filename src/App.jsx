
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import CountryCard from "./CountryCard";
import CountryFilter from "./CountryFilter";
import TravelStats from "./TravelStats";
import SavedCountryCard from "./SavedCountryCard";
import "./App.css";

function App() {
  const [country, setCountry] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [savedCountries, setSavedCountries] = useState([]);
  const [savedLoading, setSavedLoading] = useState(true);
  const [savedError, setSavedError] = useState("");
  const [deletingCode, setDeletingCode] = useState(null);
  const [filter, setFilter] = useState("all");

  // Valstybės paieška per REST Countries API
  async function loadCountry(name) {
    setLoading(true);
    setError("");
    setCountry(null);

    try {
      const { data, error: functionError } =
        await supabase.functions.invoke(
          `get-countries?name=${encodeURIComponent(name)}`,
          { method: "GET" }
        );

      if (functionError) throw functionError;

      const countryData = data?.data?.objects?.[0];

      if (!countryData) {
        throw new Error("Valstybė nerasta");
      }

      setCountry(countryData);
    } catch (err) {
      setError(err.message);
      setCountry(null);
    } finally {
      setLoading(false);
    }
  }

  // Nuskaitome išsaugotas valstybes iš Supabase
  async function loadSavedCountries() {
    setSavedLoading(true);
    setSavedError("");

    try {
      const { data, error } = await supabase
        .from("saved_countries")
        .select("id, country_code, status, created_at")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setSavedCountries(data ?? []);
    } catch (err) {
      setSavedError(err.message);
    } finally {
      setSavedLoading(false);
    }
  }

  // Paleidus puslapį užkrauname išsaugotas valstybes
  useEffect(() => {
    loadSavedCountries();
  }, []);

  // Paieškos forma
  function handleSearch(event) {
    event.preventDefault();

    const name = search.trim();
    if (!name) return;

    loadCountry(name);
  }

  // Valstybės pašalinimas
  async function deleteCountry(countryCode) {
    const confirmed = window.confirm(
      `Ar tikrai norite pašalinti valstybę ${countryCode}?`
    );

    if (!confirmed) return;

    const password = window.prompt(
      "Įveskite administratoriaus slaptažodį:"
    );

    if (!password) return;

    setDeletingCode(countryCode);
    setSavedError("");

    try {
      const { data, error } =
        await supabase.functions.invoke(
          "manage-countries",
          {
            method: "POST",
            body: {
              action: "delete",
              country_code: countryCode,
              password,
            },
          }
        );

      if (error) throw error;

      if (!data?.success) {
        throw new Error(
          data?.error || "Nepavyko pašalinti valstybės"
        );
      }

      await loadSavedCountries();
    } catch (err) {
      setSavedError(
        "Nepavyko pašalinti valstybės: " + err.message
      );
    } finally {
      setDeletingCode(null);
    }
  }

  // Filtravimas pagal statusą
  const filteredCountries = savedCountries.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  return (
    <div className="app">
      <header className="app-header">
        <nav className="navbar">
          <a href="#home" className="brand">
            <span className="brand-icon">🌍</span>
            <span>WorldExplorer</span>
          </a>

          <div className="nav-links">
            <a href="#explore">Atrask valstybes</a>
            <a href="#saved">Mano valstybės</a>
          </div>
        </nav>
      </header>

      <main className="app-main" id="home">
        {/* HERO SEKCIJA */}
        <section className="hero" id="explore">
          <div className="hero-content">
            <span className="hero-label">
              EXPLORE • DISCOVER • TRAVEL
            </span>

            <h1>
              Atrask pasaulį.
              <span> Kurk savo istoriją.</span>
            </h1>

            <p>
              Ieškok valstybių, atrask naujas kryptis ir
              išsaugok vietas, kurias svajoji aplankyti.
            </p>

            <form
              onSubmit={handleSearch}
              className="search-form"
            >
              <input
                type="text"
                placeholder="Ieškok valstybės, pvz., Japan"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                aria-label="Valstybės paieška"
              />

              <button type="submit" disabled={loading}>
                {loading ? "Ieškoma..." : "Ieškoti →"}
              </button>
            </form>
          </div>

          <div className="hero-decoration" aria-hidden="true">
            <span>🌐</span>
          </div>
        </section>

        {/* KELIONIŲ STATISTIKA */}
        <TravelStats countries={savedCountries} />

        {/* VALSTYBIŲ PAIEŠKA */}
        <section className="explore-section">
          <h2 className="section-title">
            Atrask valstybes
          </h2>

          {loading && <p>Kraunami duomenys...</p>}

          {error && (
            <p role="alert">Klaida: {error}</p>
          )}

          {!loading && !error && country && (
            <div className="countries-grid">
              <CountryCard
                country={country}
                onSaved={loadSavedCountries}
              />
            </div>
          )}

          {!loading && !error && !country && (
            <p>
              Įvesk valstybės pavadinimą paieškoje ir
              pradėk tyrinėti pasaulį!
            </p>
          )}
        </section>

        {/* MANO VALSTYBĖS */}
        <section className="saved-section" id="saved">
          <h2 className="section-title">
            Mano valstybės
          </h2>

          <CountryFilter
            filter={filter}
            onFilterChange={setFilter}
          />

          {savedLoading && (
            <p>Kraunamas sąrašas...</p>
          )}

          {savedError && (
            <p role="alert">Klaida: {savedError}</p>
          )}

          {!savedLoading &&
            !savedError &&
            filteredCountries.length === 0 && (
              <p>Šiame sąraše valstybių nėra.</p>
            )}

          {!savedLoading &&
            filteredCountries.length > 0 && (
              <div className="saved-list">
                {filteredCountries.map((item) => (
                  <SavedCountryCard
                    key={item.id}
                    country={item}
                    onDelete={deleteCountry}
                    deleting={deletingCode === item.country_code}
                  />
                ))}
              </div>
            )}
        </section>
      </main>
    </div>
  );
}

export default App;
