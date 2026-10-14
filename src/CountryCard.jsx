
import { useState } from "react";
import { supabase } from "./supabaseClient";
import { getCountryName } from "./CountryNames";
import { getCapitalName } from "./CapitalNames";
import "./CountryCard.css";

function CountryCard({ country, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // Valstybės duomenys
  const countryCode = country?.codes?.alpha_2 || "";

  // Lietuviškas valstybės pavadinimas
  const countryName = countryCode
    ? getCountryName(countryCode)
    : country?.names?.common || "Nežinoma valstybė";

  // Lietuviški regionų pavadinimai
  const regionTranslations = {
    Europe: "Europa",
    Asia: "Azija",
    Africa: "Afrika",
    Americas: "Amerika",
    Oceania: "Okeanija",
    Antarctic: "Antarktida",
    Antarctica: "Antarktida",
  };

  const countryRegion =
    regionTranslations[country?.region] ||
    country?.region ||
    "Nenurodyta";

  // Lietuviškas sostinės pavadinimas
  const originalCapital =
    country?.capitals?.[0]?.name || "";

  const countryCapital = getCapitalName(originalCapital);

  const countryPopulation =
    typeof country?.population === "number"
      ? country.population.toLocaleString("lt-LT")
      : "Nenurodyta";

  const flagUrl = country?.flag?.url_svg;
  const flagDescription = `${countryName} vėliava`;

  // Išsaugome valstybę vartotojo paskyroje
  async function saveCountry(status) {
    setSaving(true);
    setMessage("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setMessageType("error");
        setMessage(
          "Norėdami išsaugoti valstybę, prisijunkite arba užsiregistruokite."
        );
        return;
      }

      if (!countryCode) {
        throw new Error("Nerastas valstybės kodas.");
      }

      const { error } = await supabase
        .from("saved_countries")
        .upsert(
          {
            user_id: user.id,
            country_code: countryCode,
            status,
          },
          {
            onConflict: "user_id,country_code",
          }
        );

      if (error) throw error;

      setMessageType("success");
      setMessage(
        status === "visited"
          ? "Valstybė pažymėta kaip aplankyta!"
          : "Valstybė įtraukta į norimų aplankyti sąrašą!"
      );

      if (onSaved) {
        await onSaved();
      }
    } catch (err) {
      setMessageType("error");
      setMessage(
        "Nepavyko išsaugoti valstybės: " + err.message
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="country-card">
      {/* VALSTYBĖS VĖLIAVA */}
      <div className="country-card-visual">
        <div className="country-visual-glow" />

        <span className="country-visual-label">
          ATRASTA VALSTYBĖ
        </span>

        <div className="country-flag-frame">
          {flagUrl ? (
            <img
              className="country-flag"
              src={flagUrl}
              alt={flagDescription}
            />
          ) : (
            <span className="country-no-flag">
              🌍
            </span>
          )}
        </div>

        <div className="country-visual-bottom">
          <span className="country-code-badge">
            {countryCode}
          </span>

          <span className="country-visual-caption">
            Atrask naują pasaulio kampelį
          </span>
        </div>
      </div>

      {/* VALSTYBĖS INFORMACIJA */}
      <div className="country-card-content">
        <div className="country-card-header">
          <span className="country-eyebrow">
            VALSTYBĖS INFORMACIJA
          </span>

          <h2>{countryName}</h2>

          <p className="country-region">
            <span className="country-region-dot" />
            {countryRegion}
          </p>
        </div>

        <div className="country-info-grid">
          <div className="country-info">
            <span className="country-info-icon">
              🏛️
            </span>

            <div className="country-info-text">
              <span>Sostinė</span>
              <strong>{countryCapital}</strong>
            </div>
          </div>

          <div className="country-info">
            <span className="country-info-icon">
              🌍
            </span>

            <div className="country-info-text">
              <span>Regionas</span>
              <strong>{countryRegion}</strong>
            </div>
          </div>

          <div className="country-info">
            <span className="country-info-icon">
              👥
            </span>

            <div className="country-info-text">
              <span>Gyventojų skaičius</span>
              <strong>{countryPopulation}</strong>
            </div>
          </div>

          <div className="country-info">
            <span className="country-info-icon">
              📍
            </span>

            <div className="country-info-text">
              <span>Valstybės kodas</span>
              <strong>{countryCode}</strong>
            </div>
          </div>
        </div>

        <div className="country-actions-heading">
          <h3>Įtrauk į savo kelionių sąrašą</h3>

          <p>
            Pasirink, ar jau aplankei šią valstybę,
            ar planuoji ją aplankyti.
          </p>
        </div>

        <div className="country-actions">
          <button
            type="button"
            className="country-action-visited"
            onClick={() => saveCountry("visited")}
            disabled={saving}
          >
            <span aria-hidden="true">✓</span>
            Aplankyta
          </button>

          <button
            type="button"
            className="country-action-wishlist"
            onClick={() => saveCountry("wishlist")}
            disabled={saving}
          >
            <span aria-hidden="true">☆</span>
            Noriu aplankyti
          </button>
        </div>

        {message && (
          <p
            className={`country-message ${messageType}`}
            role="status"
          >
            {message}
          </p>
        )}
      </div>
    </article>
  );
}

export default CountryCard;
