import { describeWeather, formatDay, formatTemp } from "../utils/weather.js";

export default function Forecast({ daily, unit }) {
  return (
    <section className="forecast">
      <h3>Dự báo 7 ngày</h3>
      <ul>
        {daily.time.map((day, i) => {
          const { weekday, date } = formatDay(day);
          const info = describeWeather(daily.weather_code[i]);
          return (
            <li key={day} className="forecast-row">
              <div className="forecast-day">
                <strong>{i === 0 ? "Hôm nay" : weekday}</strong>
                <span className="muted">{date}</span>
              </div>
              <span className="forecast-icon" title={info.text}>{info.icon}</span>
              <div className="forecast-temp">
                <span className="max">{formatTemp(daily.temperature_2m_max[i], unit)}</span>
                <span className="min">{formatTemp(daily.temperature_2m_min[i], unit)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
