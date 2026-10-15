import { useEffect, useState } from "react";
import { CITIES } from "./data/cities.js";
import { buildUrl, describeWeather } from "./utils/weather.js";
import CityList from "./components/CityList.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import Forecast from "./components/Forecast.jsx";

const FAV_KEY = "weather-favorites";

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [selectedId, setSelectedId] = useState(null); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0); 
  const [unit, setUnit] = useState("C");
  const [favorites, setFavorites] = useState(loadFavorites);

  const selectedCity = CITIES.find((c) => c.id === selectedId);


  useEffect(() => {
    if (!selectedCity) return;

    let ignore = false; 
    setLoading(true);
    setError(null);
    setData(null);

    fetch(buildUrl(selectedCity))
      .then((res) => {
        if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!ignore) setData(json);
      })
      .catch((err) => {
        if (!ignore) setError(err.message || "Không thể kết nối.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [selectedId, retryCount]);

  function toggleFavorite(id) {
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(next);
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
    } catch {
    }
  }

  const theme = data ? describeWeather(data.current.weather_code).group : "idle";

  return (
    <div className="app" data-theme={theme}>
      <header className="header">
        <h1>Thời tiết Việt Nam</h1>
        <div className="unit-toggle" role="group" aria-label="Đơn vị nhiệt độ">
          <button className={unit === "C" ? "on" : ""} onClick={() => setUnit("C")}>°C</button>
          <button className={unit === "F" ? "on" : ""} onClick={() => setUnit("F")}>°F</button>
        </div>
      </header>

      <main className="layout">
        <CityList
          cities={CITIES}
          selectedId={selectedId}
          onSelect={setSelectedId}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        <div className="detail">
          {!selectedCity && (
            <div className="state">
              <p className="state-title">Chưa chọn thành phố</p>
              <p className="muted">Chọn một thành phố trong danh sách để xem thời tiết.</p>
            </div>
          )}

          {selectedCity && loading && (
            <div className="state" role="status">
              <div className="spinner" />
              <p>Đang tải dữ liệu {selectedCity.name}...</p>
            </div>
          )}

          {selectedCity && error && (
            <div className="state error" role="alert">
              <p className="state-title">Không tải được dữ liệu</p>
              <p className="muted">{error}</p>
              <button className="retry" onClick={() => setRetryCount((n) => n + 1)}>
                Thử lại
              </button>
            </div>
          )}

          {selectedCity && data && !loading && !error && (
            <>
              <CurrentWeather cityName={selectedCity.name} current={data.current} unit={unit} />
              <Forecast daily={data.daily} unit={unit} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
