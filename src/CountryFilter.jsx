
import "./CountryFilter.css";

function CountryFilter({ filter, onFilterChange }) {
  const filters = [
    { value: "all", label: "Visos", icon: "◎" },
    { value: "visited", label: "Aplankytos", icon: "✓" },
    { value: "wishlist", label: "Planuojamos", icon: "☆" },
  ];

  return (
    <div
      className="country-filter"
      role="group"
      aria-label="Valstybių filtravimas"
    >
      {filters.map((item) => (
        <button
          key={item.value}
          type="button"
          className={`country-filter-button ${
            filter === item.value ? "active" : ""
          }`}
          onClick={() => onFilterChange(item.value)}
          aria-pressed={filter === item.value}
        >
          <span className="filter-icon" aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export default CountryFilter;
