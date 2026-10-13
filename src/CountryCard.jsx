
import { useState } from "react";
import { supabase } from "./supabaseClient";
import "./CountryCard.css";

function CountryCard({ country, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function saveCountry(status) {
    const password = window.prompt(
      "Įveskite administratoriaus slaptažodį:"
    );

    if (!password) return;

    setSaving(true);
    setMessage("");

    try {
      const { data, error } =
        await supabase.functions.invoke(
          "manage-countries",
          {
            method: "POST",
            body: {
              country_code: country.codes.alpha_2,
              status,
              password,
            },
          }
        );

      if (error) throw error;

      if (!data?.success) {
        throw new Error(
          data?.error || "Nepavyko išsaugoti"
        );
      }

      setMessage("Valstybė sėkmingai išsaugota!");

      // Automatiškai atnaujiname išsaugotų valstybių sąrašą
      if (onSaved) {
        await onSaved();
      }
    } catch (err) {
      setMessage("Klaida: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="country-card">
      <img
        className="country-flag"
        src={country.flag.url_svg}
        alt={country.flag.description}
      />

      <h2>{country.names.common}</h2>

      <p className="country-region">
        {country.codes.alpha_2} · {country.region}
      </p>

      <div className="country-info">
        <span>Sostinė</span>
        <strong>
          {country.capitals?.[0]?.name || "Nenurodyta"}
        </strong>
      </div>

      <div className="country-info">
        <span>Gyventojai</span>
        <strong>
          {country.population.toLocaleString("lt-LT")}
        </strong>
      </div>

      <div className="country-actions">
        <button
          onClick={() => saveCountry("visited")}
          disabled={saving}
        >
          ✓ Aplankyta
        </button>

        <button
          onClick={() => saveCountry("wishlist")}
          disabled={saving}
        >
          ☆ Noriu aplankyti
        </button>
      </div>

      {message && (
        <p className="country-message" role="status">
          {message}
        </p>
      )}
    </div>
  );
}

export default CountryCard;
