
import "./TravelStats.css";

function TravelStats({ countries }) {
  const visited = countries.filter(
    (country) => country.status === "visited"
  ).length;

  const wishlist = countries.filter(
    (country) => country.status === "wishlist"
  ).length;

  const total = countries.length;

  return (
    <section className="travel-stats">
      <div className="stats-heading">
        <h2>Tavo kelionių statistika</h2>
        <p>Tavo kelionių tikslai vienoje vietoje</p>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <span className="stats-icon visited-icon">
            ✓
          </span>
          <strong>{visited}</strong>
          <span>Aplankyta</span>
        </div>

        <div className="stats-card">
          <span className="stats-icon wishlist-icon">
            ☆
          </span>
          <strong>{wishlist}</strong>
          <span>Planuojama</span>
        </div>

        <div className="stats-card">
          <span className="stats-icon total-icon">
            🌍
          </span>
          <strong>{total}</strong>
          <span>Iš viso išsaugota</span>
        </div>
      </div>
    </section>
  );
}

export default TravelStats;
