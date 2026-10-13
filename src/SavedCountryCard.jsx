
import { getCountryName } from "./CountryNames";
import "./SavedCountryCard.css";

function SavedCountryCard({
  country,
  onDelete,
  deleting,
}) {
  const code = country.country_code;

  // Gauname lietuvišką valstybės pavadinimą
  const countryName = getCountryName(code);

  // Sukuriame valstybės vėliavos emoji
  const flag = /^[A-Z]{2}$/.test(code)
    ? String.fromCodePoint(
        ...[...code].map(
          (char) => 127397 + char.charCodeAt(0)
        )
      )
    : "🌍";

  // Nustatome valstybės statusą
  const statusLabel =
    country.status === "visited"
      ? "✓ Aplankyta"
      : "☆ Planuojama";

  return (
    <div className="saved-country-card">
      <div className="saved-country-details">
        <span className="saved-country-flag">
          {flag}
        </span>

        <div>
          <h3>{countryName}</h3>

          <p>
            {code} ·{" "}
            {country.status === "visited"
              ? "Aplankyta valstybė"
              : "Kelionės planuose"}
          </p>
        </div>
      </div>

      <span
        className={`saved-country-status ${country.status}`}
      >
        {statusLabel}
      </span>

      <button
        type="button"
        className="saved-country-delete"
        disabled={deleting}
        onClick={() => onDelete(code)}
      >
        {deleting ? "Šalinama..." : "Pašalinti"}
      </button>
    </div>
  );
}

export default SavedCountryCard;
