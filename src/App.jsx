
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { getSearchName } from "./CountryNames";
import Auth from "./Auth";
import CountryCard from "./CountryCard";
import CountryFilter from "./CountryFilter";
import TravelStats from "./TravelStats";
import SavedCountryCard from "./SavedCountryCard";
import "./App.css";

function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  const [country, setCountry] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [savedCountries, setSavedCountries] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [savedError, setSavedError] = useState("");
  const [deletingCode, setDeletingCode] = useState(null);
  const [filter, setFilter] = useState("all");

  const popularSearches = [
    { label: "Ispanija", value: "Ispanija" },
    { label: "Italija", value: "Italija" },
    { label: "Jungtinė Karalystė", value: "Jungtinė Karalystė" },
  ];

  useEffect(() => {
    let active = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!active) return;
        setSession(data.session);
        setAuthLoading(false);
      })
      .catch(() => {
        if (active) setAuthLoading(false);
      });

    const { data: authListener } =
      supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          if (!active) return;

          setSession(newSession);
          setAuthLoading(false);

          if (newSession) {
            setShowAuth(false);
          }
        }
      );

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Valstybės paieška lietuvių arba anglų kalba
  async function loadCountry(name) {
    setLoading(true);
    setError("");
    setCountry(null);

    try {
      const apiSearchName = getSearchName(name);

      const { data, error: functionError } =
        await supabase.functions.invoke(
          `get-countries?name=${encodeURIComponent(apiSearchName)}`,
          { method: "GET" }
        );

      if (functionError) throw functionError;

      const countryData = data?.data?.objects?.[0];

      if (!countryData) {
        throw new Error(
          "Valstybė nerasta. Patikrink pavadinimą."
        );
      }

      setCountry(countryData);

      // Parodome rezultatą po Hero sekcija
      setTimeout(() => {
        document
          .querySelector(".explore-section")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (err) {
      setError(err.message);
      setCountry(null);
    } finally {
      setLoading(false);
    }
  }

  async function loadSavedCountries(userId) {
    const currentUserId = userId || session?.user?.id;

    if (!currentUserId) {
      setSavedCountries([]);
      setSavedLoading(false);
      return;
    }

    setSavedLoading(true);
    setSavedError("");

    try {
      const { data, error: queryError } = await supabase
        .from("saved_countries")
        .select("id, country_code, status, created_at")
        .eq("user_id", currentUserId)
        .order("created_at", { ascending: false });

      if (queryError) throw queryError;

      setSavedCountries(data ?? []);
    } catch (err) {
      setSavedError(err.message);
    } finally {
      setSavedLoading(false);
    }
  }

  useEffect(() => {
    if (authLoading) return;

    if (session?.user?.id) {
      loadSavedCountries(session.user.id);
    } else {
      setSavedCountries([]);
      setSavedError("");
      setSavedLoading(false);
      setFilter("all");
    }
  }, [session?.user?.id, authLoading]);

  function handleSearch(event) {
    event.preventDefault();

    const name = search.trim();
    if (name) loadCountry(name);
  }

  function handleQuickSearch(value) {
    setSearch(value);
    loadCountry(value);
  }

  async function handleLogout() {
    const { error: logoutError } =
      await supabase.auth.signOut();

    if (logoutError) {
      window.alert(
        "Nepavyko atsijungti: " + logoutError.message
      );
    }
  }

  async function deleteCountry(countryCode) {
    if (!session?.user?.id) {
      setShowAuth(true);
      return;
    }

    const confirmed = window.confirm(
      `Ar tikrai norite pašalinti valstybę ${countryCode}?`
    );

    if (!confirmed) return;

    setDeletingCode(countryCode);
    setSavedError("");

    try {
      const { error: deleteError } = await supabase
        .from("saved_countries")
        .delete()
        .eq("country_code", countryCode)
        .eq("user_id", session.user.id);

      if (deleteError) throw deleteError;

      await loadSavedCountries(session.user.id);
    } catch (err) {
      setSavedError(
        "Nepavyko pašalinti valstybės: " + err.message
      );
    } finally {
      setDeletingCode(null);
    }
  }

  const filteredCountries = savedCountries.filter(
    (item) => filter === "all" || item.status === filter
  );

  return (
    <div className="app">
      <div className="page-glow page-glow-1" />
      <div className="page-glow page-glow-2" />

      <header className="app-header">
        <nav
          className="navbar"
          aria-label="Pagrindinė navigacija"
        >
          <a href="#home" className="brand">
            <span className="brand-symbol" aria-hidden="true">
              <svg
                viewBox="0 0 48 48"
                width="28"
                height="28"
                fill="none"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <ellipse
                  cx="24"
                  cy="24"
                  rx="9"
                  ry="19"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M5 24H43M9 14H39M9 34H39"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span className="brand-text">
              World<span>Explorer</span>
            </span>
          </a>

          <div className="nav-center">
            <a className="nav-link" href="#explore">
              Atrask pasaulį
            </a>

            {session && (
              <a className="nav-link" href="#saved">
                Mano valstybės
              </a>
            )}
          </div>

          <div className="nav-actions">
            {!authLoading &&
              (session ? (
                <>
                  <span
                    className="account-avatar"
                    aria-hidden="true"
                  >
                    {session.user.email
                      ?.charAt(0)
                      .toUpperCase() || "V"}
                  </span>

                  <div className="account-details">
                    <span className="account-label">
                      Mano paskyra
                    </span>
                    <span className="user-email">
                      {session.user.email}
                    </span>
                  </div>

                  <button
                    className="nav-button secondary"
                    type="button"
                    onClick={handleLogout}
                  >
                    Atsijungti
                  </button>
                </>
              ) : (
                <button
                  className="nav-button primary"
                  type="button"
                  onClick={() => setShowAuth(true)}
                >
                  Prisijungti
                </button>
              ))}
          </div>
        </nav>
      </header>

      <main className="app-main" id="home">
        <section className="hero" id="explore">
          <div className="hero-left">
            <span className="hero-kicker">
              PASAULIS • ATRADIMAI • KELIONĖS
            </span>

            <h1 className="hero-title">
              Atrask pasaulį.
              <span>Kurk savo istoriją.</span>
            </h1>

            <p className="hero-description">
              Pažink įspūdingiausias pasaulio vietas,
              atrask naujas kryptis ir išsaugok savo
              kelionių planus vienoje vietoje.
            </p>

            <form
              onSubmit={handleSearch}
              className="search-form"
            >
              <input
                type="text"
                placeholder="Ieškok valstybės, pvz., Italija"
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

            <div className="hero-popular">
              <span className="popular-label">
                Populiaru:
              </span>

              <div className="popular-chips">
                {popularSearches.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    className="popular-chip"
                    onClick={() => handleQuickSearch(item.value)}
                    disabled={loading}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {session && (
          <section className="content-section">
            <TravelStats countries={savedCountries} />
          </section>
        )}

        <section className="content-section explore-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">Paieška</span>
              <h2 className="section-title">
                Atrask valstybes
              </h2>
            </div>
          </div>

          {loading && (
            <p className="section-message">
              Kraunami duomenys...
            </p>
          )}

          {error && (
            <p className="section-error" role="alert">
              Klaida: {error}
            </p>
          )}

          {!loading && !error && country && (
            <div className="countries-grid">
              <CountryCard
                country={country}
                onSaved={() =>
                  loadSavedCountries(session?.user?.id)
                }
              />
            </div>
          )}

          {!loading && !error && !country && (
            <div className="empty-card">
              <h3>Pradėk nuo paieškos</h3>
              <p>
                Įvesk valstybės pavadinimą ir atrask
                informaciją apie ją.
              </p>
            </div>
          )}

          {!session && !authLoading && (
            <div className="auth-cta-card">
              <h3>Pradėk savo kelionių istoriją</h3>
              <p>
                Prisijunk arba registruokis ir
                išsaugok aplankytas bei planuojamas
                valstybes.
              </p>
              <button
                type="button"
                className="cta-button"
                onClick={() => setShowAuth(true)}
              >
                Prisijungti arba registruotis
              </button>
            </div>
          )}
        </section>

        {session && (
          <section
            className="content-section saved-section"
            id="saved"
          >
            <div className="section-heading">
              <div>
                <span className="section-eyebrow">
                  Mano kelionės
                </span>
                <h2 className="section-title">
                  Mano valstybės
                </h2>
              </div>
            </div>

            <CountryFilter
              filter={filter}
              onFilterChange={setFilter}
            />

            {savedLoading && (
              <p className="section-message">
                Kraunamas sąrašas...
              </p>
            )}

            {savedError && (
              <p className="section-error" role="alert">
                Klaida: {savedError}
              </p>
            )}

            {!savedLoading &&
              !savedError &&
              filteredCountries.length === 0 && (
                <div className="empty-card">
                  <h3>Kol kas tuščia</h3>
                  <p>
                    Išsaugok pirmąją valstybę ir ji
                    atsiras šiame sąraše.
                  </p>
                </div>
              )}

            {!savedLoading &&
              !savedError &&
              filteredCountries.length > 0 && (
                <div className="saved-list">
                  {filteredCountries.map((item) => (
                    <SavedCountryCard
                      key={item.id}
                      country={item}
                      onDelete={deleteCountry}
                      deleting={
                        deletingCode === item.country_code
                      }
                    />
                  ))}
                </div>
              )}
          </section>
        )}
      </main>

      {showAuth && !session && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setShowAuth(false)}
        >
          <div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-label="Prisijungimas arba registracija"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Uždaryti"
              onClick={() => setShowAuth(false)}
            >
              ×
            </button>

            <Auth />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
