
function CountryFilter({ filter, onFilterChange }) {
    return (
      <div className="country-filter">
        <button
          type="button"
          onClick={() => onFilterChange("all")}
          className={filter === "all" ? "active" : ""}
        >
          Visos
        </button>
  
        <button
          type="button"
          onClick={() => onFilterChange("visited")}
          className={filter === "visited" ? "active" : ""}
        >
          Aplankytos
        </button>
  
        <button
          type="button"
          onClick={() => onFilterChange("wishlist")}
          className={filter === "wishlist" ? "active" : ""}
        >
          Planuojamos
        </button>
      </div>
    );
  }
  
  export default CountryFilter;
  