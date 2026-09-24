// Weather data helper for Sunny Beach Amusement Park.
// Server-side current conditions + multi-day forecast.
// Source: Open-Meteo (no key required, fetched at request time and cached).
// The UI never exposes provider details to visitors — they only care about
// whether it will rain and what to bring.

export type WmoLang = 'en' | 'bg' | 'zh';

export interface CurrentWeather {
  tempC: number;
  feelsLikeC: number;
  humidity: number;
  precipProb: number;
  code: number;
  windKmh: number;
  windMs: number;
  description: string;
  isRainy: boolean;
}

export interface DailyWeather {
  date: string;
  weekday: string;
  code: number;
  description: string;
  tmax: number;
  tmin: number;
  precipProb: number;
  windKmh: number;
  uv: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyWeather[];
  updatedAt: string;
}

// WMO weather interpretation codes → short, visitor-friendly descriptions.
const WMO: Record<number, { en: string; bg: string; zh: string }> = {
  0: { en: 'Clear sky', bg: 'Ясно небе', zh: '晴朗' },
  1: { en: 'Mainly clear', bg: 'Предимно ясно', zh: '大致晴朗' },
  2: { en: 'Partly cloudy', bg: 'Разкъсана облачност', zh: '局部多云' },
  3: { en: 'Overcast', bg: 'Облачно', zh: '阴天' },
  45: { en: 'Fog', bg: 'Мъгла', zh: '雾' },
  48: { en: 'Rime fog', bg: 'Мъгла с скреж', zh: '雾凇' },
  51: { en: 'Light drizzle', bg: 'Слаба мъгла', zh: '小毛毛雨' },
  53: { en: 'Drizzle', bg: 'Мъгла', zh: '毛毛雨' },
  55: { en: 'Dense drizzle', bg: 'Гъста мъгла', zh: '浓毛毛雨' },
  56: { en: 'Freezing drizzle', bg: 'Замръзваща мъгла', zh: '冻毛毛雨' },
  57: { en: 'Freezing drizzle', bg: 'Замръзваща мъгла', zh: '冻毛毛雨' },
  61: { en: 'Light rain', bg: 'Слаб дъжд', zh: '小雨' },
  63: { en: 'Rain', bg: 'Дъжд', zh: '中雨' },
  65: { en: 'Heavy rain', bg: 'Силен дъжд', zh: '大雨' },
  66: { en: 'Freezing rain', bg: 'Замръзващ дъжд', zh: '冻雨' },
  67: { en: 'Freezing rain', bg: 'Замръзващ дъжд', zh: '冻雨' },
  71: { en: 'Light snow', bg: 'Слаб сняг', zh: '小雪' },
  73: { en: 'Snow', bg: 'Сняг', zh: '中雪' },
  75: { en: 'Heavy snow', bg: 'Силен сняг', zh: '大雪' },
  77: { en: 'Snow grains', bg: 'Снежни зърна', zh: '雪粒' },
  80: { en: 'Light rain showers', bg: 'Слаби превалявания', zh: '零星阵雨' },
  81: { en: 'Rain showers', bg: 'Превалявания', zh: '阵雨' },
  82: { en: 'Violent rain showers', bg: 'Силни превалявания', zh: '强阵雨' },
  85: { en: 'Light snow showers', bg: 'Слаби снежни превалявания', zh: '零星阵雪' },
  86: { en: 'Snow showers', bg: 'Снежни превалявания', zh: '阵雪' },
  95: { en: 'Thunderstorm', bg: 'Гръмотевична буря', zh: '雷阵雨' },
  96: { en: 'Thunderstorm with hail', bg: 'Гръмотевична буря с градушка', zh: '雷阵雨伴冰雹' },
  99: { en: 'Thunderstorm with hail', bg: 'Гръмотевична буря с градушка', zh: '雷阵雨伴冰雹' },
};

const RAIN_CODES = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99]);

export function wmoDescription(code: number, lang: WmoLang): string {
  return WMO[code]?.[lang] ?? (lang === 'bg' ? 'Променливо' : lang === 'zh' ? '天气多变' : 'Variable');
}

export function isRainCode(code: number): boolean {
  return RAIN_CODES.has(code);
}

// Beaufort scale from wind speed in m/s, with a short localized label.
export function beaufort(ms: number): { level: number; label: { en: string; bg: string; zh: string } } {
  const table: Array<[number, { en: string; bg: string; zh: string }]> = [
    [0.3, { en: 'Calm', bg: 'Безветрие', zh: '无风' }],
    [1.6, { en: 'Light air', bg: 'Слаб бриз', zh: '软风' }],
    [3.4, { en: 'Light breeze', bg: 'Лек бриз', zh: '轻风' }],
    [5.5, { en: 'Gentle breeze', bg: 'Умерен бриз', zh: '微风' }],
    [8.0, { en: 'Moderate breeze', bg: 'Умерен вятър', zh: '和风' }],
    [10.8, { en: 'Fresh breeze', bg: 'Свеж вятър', zh: '清劲风' }],
    [13.9, { en: 'Strong breeze', bg: 'Силен вятър', zh: '强风' }],
    [17.2, { en: 'Near gale', bg: 'Бурен вятър', zh: '疾风' }],
    [20.8, { en: 'Gale', bg: 'Буря', zh: '大风' }],
    [24.5, { en: 'Strong gale', bg: 'Силна буря', zh: '狂风' }],
    [28.5, { en: 'Storm', bg: 'Щорм', zh: '暴风' }],
    [32.7, { en: 'Violent storm', bg: 'Виолентен щорм', zh: '台风' }],
  ];
  let level = 0;
  let label = table[0][1];
  for (let i = 0; i < table.length; i++) {
    if (ms >= table[i][0]) {
      level = i + 1;
      label = table[i][1];
    }
  }
  return { level, label };
}

const LOCALE_TAG: Record<WmoLang, string> = {
  en: 'en-US',
  bg: 'bg-BG',
  zh: 'zh-CN',
};

function weekday(dateStr: string, lang: WmoLang): string {
  const d = new Date(`${dateStr}T00:00:00`);
  return new Intl.DateTimeFormat(LOCALE_TAG[lang], { weekday: 'short' }).format(d);
}

const PARK_LAT = 42.6929674;
const PARK_LON = 27.7133825;

// Fetch current + 7-day forecast. Returns null on any failure so the
// component can render a neutral fallback instead of crashing the page.
export async function getWeather(lang: WmoLang): Promise<WeatherData | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${PARK_LAT}&longitude=${PARK_LON}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max` +
    `&timezone=auto&forecast_days=7`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as any;

    const cur = json.current;
    const daily = json.daily;
    if (!cur || !daily) return null;

    const current: CurrentWeather = {
      tempC: Math.round(cur.temperature_2m),
      feelsLikeC: Math.round(cur.apparent_temperature),
      humidity: Math.round(cur.relative_humidity_2m),
      precipProb: Math.round(cur.precipitation_probability ?? 0),
      code: cur.weather_code,
      windMs: cur.wind_speed_10m,
      windKmh: Math.round(cur.wind_speed_10m * 3.6),
      description: wmoDescription(cur.weather_code, lang),
      isRainy: isRainCode(cur.weather_code) || (cur.precipitation_probability ?? 0) >= 50,
    };

    const days: DailyWeather[] = (daily.time as string[]).map((date, i) => ({
      date,
      weekday: weekday(date, lang),
      code: daily.weather_code[i],
      description: wmoDescription(daily.weather_code[i], lang),
      tmax: Math.round(daily.temperature_2m_max[i]),
      tmin: Math.round(daily.temperature_2m_min[i]),
      precipProb: Math.round(daily.precipitation_probability_max?.[i] ?? 0),
      windKmh: Math.round((daily.wind_speed_10m_max?.[i] ?? 0) * 3.6),
      uv: Math.round(daily.uv_index_max?.[i] ?? 0),
    }));

    return {
      current,
      daily: days,
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// Build a short, practical list of "what to bring / what to expect" tips
// derived purely from the forecast. Localized, no provider references.
export function buildAdvice(data: WeatherData, lang: WmoLang): string[] {
  const out: string[] = [];
  const c = data.current;
  const today = data.daily[0];
  const t = ADVICE[lang];

  if (c.isRainy || (today && today.precipProb >= 50)) {
    out.push(t.umbrella);
  }
  if (today && today.uv >= 6) {
    out.push(t.sunscreen);
  }
  if (c.feelsLikeC >= 30) {
    out.push(t.hydrate);
  } else if (c.feelsLikeC <= 12) {
    out.push(t.warmLayer);
  }
  if (c.windKmh >= 25) {
    out.push(t.windy);
  }
  if (out.length === 0 && !c.isRainy) {
    out.push(t.pleasant);
  }
  return out;
}

const ADVICE: Record<WmoLang, {
  umbrella: string;
  sunscreen: string;
  hydrate: string;
  warmLayer: string;
  windy: string;
  pleasant: string;
}> = {
  en: {
    umbrella: 'A high chance of rain — bring an umbrella or a light raincoat.',
    sunscreen: 'Strong sun expected — pack sunscreen, a hat and sunglasses.',
    hydrate: 'It will feel hot — carry water and drink regularly.',
    warmLayer: 'Evenings get cool by the sea — bring a light jacket or sweater.',
    windy: 'Breezy conditions — hold onto hats and light items.',
    pleasant: 'Calm, pleasant weather — a great evening for the lit-up rides.',
  },
  bg: {
    umbrella: 'Голяма вероятност от дъжд — вземете чадър или лек дъждобран.',
    sunscreen: 'Очаква се силно слънце — носете слънцезащитен крем, шапка и очила.',
    hydrate: 'Ще е горещо — носете вода и пийте редовно.',
    warmLayer: 'Вечерите край морето застудяват — вземете леко яке или пуловер.',
    windy: 'Има вятър — дръжте шапките и леките вещи.',
    pleasant: 'Спокойно, приятно време — чудесна вечер за осветените атракции.',
  },
  zh: {
    umbrella: '降雨概率较高——请带伞或轻便雨衣。',
    sunscreen: '紫外线较强——备好防晒霜、帽子和太阳镜。',
    hydrate: '体感炎热——请随身带水并适时补充水分。',
    warmLayer: '海边夜晚偏凉——带一件薄外套或毛衣。',
    windy: '风力较大——请注意拿好帽子和轻便物品。',
    pleasant: '天气平稳舒适——正适合欣赏入夜后灯光璀璨的游乐设施。',
  },
};
