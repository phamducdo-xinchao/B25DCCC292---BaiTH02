// Chuyển mã thời tiết (WMO) thành biểu tượng + mô tả + nhóm (dùng đổi màu nền)
export function describeWeather(code) {
  if (code === 0) return { icon: "☀️", text: "Trời quang", group: "clear" };
  if (code === 1) return { icon: "🌤️", text: "Ít mây", group: "clear" };
  if (code === 2) return { icon: "⛅", text: "Có mây rải rác", group: "cloudy" };
  if (code === 3) return { icon: "☁️", text: "Nhiều mây", group: "cloudy" };
  if (code === 45 || code === 48) return { icon: "🌫️", text: "Sương mù", group: "cloudy" };
  if (code >= 51 && code <= 57) return { icon: "🌦️", text: "Mưa phùn", group: "rain" };
  if (code >= 61 && code <= 67) return { icon: "🌧️", text: "Mưa", group: "rain" };
  if (code >= 71 && code <= 77) return { icon: "❄️", text: "Tuyết", group: "cloudy" };
  if (code >= 80 && code <= 82) return { icon: "🌦️", text: "Mưa rào", group: "rain" };
  if (code === 85 || code === 86) return { icon: "❄️", text: "Mưa tuyết", group: "cloudy" };
  if (code >= 95) return { icon: "⛈️", text: "Dông", group: "storm" };
  return { icon: "❓", text: "Không rõ", group: "cloudy" };
}

// Đổi nhiệt độ (YC5): API luôn trả °C, chỉ quy đổi khi hiển thị
export function formatTemp(celsius, unit) {
  const value = unit === "F" ? (celsius * 9) / 5 + 32 : celsius;
  return `${Math.round(value)}°${unit}`;
}

const WEEKDAYS = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

// "2026-10-15" -> { weekday: "Thứ năm", date: "15/10" }
export function formatDay(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return { weekday, date: `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}` };
}

// "2026-10-15T14:00" -> "14:00 - 15/10/2026"
export function formatUpdateTime(isoDateTime) {
  const [date, time] = isoDateTime.split("T");
  const [y, m, d] = date.split("-");
  return `${time} - ${d}/${m}/${y}`;
}

// Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu
export function removeDiacritics(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export function buildUrl(city) {
  return (
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${city.lat}&longitude=${city.lon}` +
    "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
    "&daily=weather_code,temperature_2m_max,temperature_2m_min" +
    "&timezone=Asia%2FHo_Chi_Minh&forecast_days=7"
  );
}
