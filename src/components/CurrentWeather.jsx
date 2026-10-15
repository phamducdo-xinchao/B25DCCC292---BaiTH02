import { describeWeather, formatTemp, formatUpdateTime } from "../utils/weather.js";

export default function CurrentWeather({ cityName, current, unit }) {
  const info = describeWeather(current.weather_code);

  return (
    <section className="current">
      <h2>{cityName}</h2>
      <div className="current-main">
        <span className="current-icon" aria-hidden="true">{info.icon}</span>
        <div>
          <div className="current-temp">{formatTemp(current.temperature_2m, unit)}</div>
          <div className="current-desc">{info.text}</div>
        </div>
      </div>
      <dl className="current-stats">
        <div>
          <dt>Độ ẩm</dt>
          <dd>{current.relative_humidity_2m}%</dd>
        </div>
        <div>
          <dt>Tốc độ gió</dt>
          <dd>{current.wind_speed_10m} km/h</dd>
        </div>
        <div>
          <dt>Cập nhật lúc</dt>
          <dd>{formatUpdateTime(current.time)}</dd>
        </div>
      </dl>
    </section>
  );
}
