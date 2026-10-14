
import "./TravelStats.css";

function TravelStats({ countries = [] }) {
  // Apskaičiuojame vartotojo statistiką
  const visited = countries.filter(
    (country) => country.status === "visited"
  ).length;

  const wishlist = countries.filter(
    (country) => country.status === "wishlist"
  ).length;

  const total = countries.length;

  return (
    <section
      className="travel-stats"
      aria-label="Tavo kelionių statistika"
    >
      <div className="stats-heading">
        <div>
          <span className="stats-eyebrow">
            MANO KELIONĖS
          </span>

          <h2>Tavo kelionių statistika</h2>

          <p>
            Atrask, kiek pasaulio jau pažinai
            ir kiek kelionių dar laukia.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        {/* APLANKYTOS VALSTYBĖS */}
        <div className="stats-card stats-visited">
          <div className="stats-icon visited-icon">
            <span aria-hidden="true">✈</span>
          </div>

          <div className="stats-content">
            <strong className="stats-number">
              {visited}
            </strong>

            <span className="stats-label">
              Aplankyta
            </span>

            <span className="stats-description">
              Valstybės, kuriose jau buvai
            </span>
          </div>

          <span
            className="stats-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>

        {/* PLANUOJAMOS VALSTYBĖS */}
        <div className="stats-card stats-wishlist">
          <div className="stats-icon wishlist-icon">
            <span aria-hidden="true">☆</span>
          </div>

          <div className="stats-content">
            <strong className="stats-number">
              {wishlist}
            </strong>

            <span className="stats-label">
              Planuojama
            </span>

            <span className="stats-description">
              Valstybės, kurias nori aplankyti
            </span>
          </div>

          <span
            className="stats-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>

        {/* VISOS IŠSAUGOTOS VALSTYBĖS */}
        <div className="stats-card stats-total">
          <div className="stats-icon total-icon">
            <span aria-hidden="true">🌍</span>
          </div>

          <div className="stats-content">
            <strong className="stats-number">
              {total}
            </strong>

            <span className="stats-label">
              Iš viso išsaugota
            </span>

            <span className="stats-description">
              Aplankytos ir planuojamos
            </span>
          </div>

          <span
            className="stats-arrow"
            aria-hidden="true"
          >
            ↗
          </span>
        </div>
      </div>
    </section>
  );
}

export default TravelStats;
