import { useState } from "react";
import { removeDiacritics } from "../utils/weather.js";

export default function CityList({ cities, selectedId, onSelect, favorites, onToggleFavorite }) {
  const [query, setQuery] = useState("");

  const keyword = removeDiacritics(query.trim());
  const filtered = cities.filter((c) => removeDiacritics(c.name).includes(keyword));

  return (
    <aside className="city-list">
      <input
        className="search"
        type="search"
        placeholder="Tìm thành phố (không cần gõ dấu)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Tìm thành phố"
      />

      {filtered.length === 0 && <p className="muted">Không có thành phố phù hợp.</p>}

      <ul>
        {filtered.map((city) => {
          const isActive = city.id === selectedId;
          const isFav = favorites.includes(city.id);
          return (
            <li key={city.id} className={isActive ? "city-item active" : "city-item"}>
              <button
                className="city-name"
                onClick={() => onSelect(city.id)}
                aria-current={isActive ? "true" : undefined}
              >
                {city.name}
              </button>
              <button
                className={isFav ? "star on" : "star"}
                onClick={() => onToggleFavorite(city.id)}
                aria-label={isFav ? `Bỏ yêu thích ${city.name}` : `Thêm ${city.name} vào yêu thích`}
                title={isFav ? "Bỏ yêu thích" : "Yêu thích"}
              >
                {isFav ? "★" : "☆"}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
