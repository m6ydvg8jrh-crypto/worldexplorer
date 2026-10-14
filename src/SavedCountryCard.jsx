
import { getCountryName } from "./CountryNames";
import "./SavedCountryCard.css";

function SavedCountryCard({
  country,
  onDelete,
  deleting,
}) {
  const code = country.country_code?.toUpperCase() || "";

  // Lietuviškas valstybės pavadinimas
  const countryName = getCountryName(code);

  // Valstybės vėliavos emoji
  const flag = /^[A-Z]{2}$/.test(code)
    ? String.fromCodePoint(
        ...[...code].map(
          (char) => 127397 + char.charCodeAt(0)
        )
      )
    : "🌍";

  const isVisited = country.status === "visited";

  const statusLabel = isVisited
    ? "Aplankyta"
    : "Planuojama";

  const statusDescription = isVisited
    ? "Šią valstybę jau aplankei"
    : "Ši valstybė tavo kelionių planuose";

  const savedDate = country.created_at
    ? new Date(country.created_at).toLocaleDateString("lt-LT")
    : null;

  return (
    <article className="saved-country-card">
      <div className="saved-country-top">
        <span className="saved-country-eyebrow">
          MANO KELIONIŲ SĄRAŠAS
        </span>

        <span className="saved-country-code">
          {code}
        </span>
      </div>

      <div className="saved-country-details">
        <div className="saved-country-flag-box">
          <span
            className="saved-country-flag"
            role="img"
            aria-label={`${countryName} vėliava`}
          >
            {flag}
          </span>
        </div>

        <div className="saved-country-name">
          <h3>{countryName}</h3>

          <p>{statusDescription}</p>
        </div>
      </div>

      <div className="saved-country-status-row">
        <span
          className={`saved-country-status ${
            isVisited ? "visited" : "wishlist"
          }`}
        >
          <span aria-hidden="true">
            {isVisited ? "✓" : "☆"}
          </span>

          {statusLabel}
        </span>
      </div>

      <div className="saved-country-footer">
        <div className="saved-country-date">
          <span>Išsaugota</span>
          <strong>{savedDate || "Nenurodyta"}</strong>
        </div>

        <button
          type="button"
          className="saved-country-delete"
          disabled={deleting}
          onClick={() => onDelete(code)}
          aria-label={`Pašalinti ${countryName}`}
        >
          <span aria-hidden="true">×</span>
          {deleting ? "Šalinama..." : "Pašalinti"}
        </button>
      </div>
    </article>
  );
}

export default SavedCountryCard;
