import { routing, type Locale } from '@/i18n/routing';
import { areas, type Access } from './nearby-labels';
import records from './nearby-places.json';
import photos from './nearby-photos.json';
import visits from './nearby-visit.json';

const sources = {
  guide: 'https://visitnessebar.bg/guides/ENG-Tourist-Guide-Nessebar.pdf',
  unesco: 'https://whc.unesco.org/en/list/217/',
  action: 'https://aquapark.bg/',
  paradise: 'https://nessebaraquapark.com/contacts/',
  vlas: 'https://visitnessebar.bg/dataen/79',
  irakli: 'https://visitnessebar.bg/guides/ENG-Tourist-Guide-Nessebar.pdf',
  cape: 'https://visitnessebar.bg/guides/ENG-Tourist-Guide-Nessebar.pdf',
  salt: 'https://pomorietourism.bg/en/salt-museum-pomorie/',
  tomb: 'https://pomorietourism.bg/en/thracian-antique-dome-tomb/',
  monastery: 'https://pomorietourism.bg/en/the-monastery-of-saint-george/',
  lake: 'https://rsis.ramsar.org/ris/1229',
  history: 'https://pomorietourism.bg/en/historical-museum-pomorie/',
  transfiguration: 'https://pomorietourism.bg/tsarkvata-preobrazhenie-gospodne/',
  sunnyCentral: 'https://www.tourism.government.bg/en/content/sunny-beach-central',
  nesebarSouth: 'https://www.tourism.government.bg/en/content/nessebar-south',
  pomorieVisitorCenter: 'https://pomorielake.greenbalkans.org/visitor-center',
  archaeologicalMuseum: 'https://visitnessebar.bg/visit-placeen/67',
  irakliRegister: 'https://pdbase.government.bg/zpo/bg/area.jsp?NEM_Partition=1&areaID=113&categoryID=6',
  capeRegister: 'https://pdbase.eea.government.bg/zpo/bg/area.jsp?NEM_Partition=1&areaID=247&categoryID=3',
  slivenDiocese: 'https://slivenskamitropolia.bg/news/preobrazhenie-gospodne-v-pomorie/',
};

const operators = {
  nesebar: ['Община Несебър', 'Nesebar Municipality', '内塞巴尔市政府', 'עיריית נסבר', 'Primăria Nessebar'],
  museum: ['Музей „Старинен Несебър“', 'Museum of Ancient Nesebar', '内塞巴尔古城博物馆', 'מוזיאון נסבר העתיקה', 'Muzeul Nessebarul Vechi'],
  beach: ['Министерството на туризма публикува статута на плажа. Проверете табелата на входа за текущия оператор.', 'Bulgaria’s Ministry of Tourism publishes the beach’s operating status. Check the entrance sign for the current operator.', '保加利亚旅游部公布海滩运营类别，当前现场运营单位以入口公示为准。', 'משרד התיירות הבולגרי מפרסם את מעמד החוף. את שם המפעיל הנוכחי אפשר לבדוק בשלט הכניסה.', 'Ministerul Turismului publică statutul plajei. Verificați panoul de la intrare pentru operatorul actual.'],
  action: ['Action Aquapark', 'Action Aquapark', 'Action 水上乐园', 'פארק המים אקשן', 'Action Aquapark'],
  paradise: ['Aquapark Nessebar', 'Aquapark Nessebar', '内塞巴尔水上乐园', 'פארק המים נסבר', 'Aquapark Nessebar'],
  dinevi: ['Марина Диневи', 'Marina Dinevi', '迪内维游艇码头运营方', 'מרינה דינבי', 'Marina Dinevi'],
  pomorie: ['Община Поморие', 'Pomorie Municipality', '波莫里耶市政府', 'עיריית פומוריה', 'Primăria Pomorie'],
  pomHistory: ['Исторически музей Поморие', 'Pomorie Historical Museum', '波莫里耶历史博物馆', 'המוזיאון ההיסטורי בפומוריה', 'Muzeul de Istorie din Pomorie'],
  monastery: ['Манастир „Свети Георги“', 'Saint George Monastery', '圣乔治修道院', 'מנזר גאורגיוס הקדוש', 'Mănăstirea Sfântul Gheorghe'],
  pomorieLake: ['„Зелени Балкани“ осигурява информация за посетителите в природозащитния център.', 'Green Balkans provides visitor information at the nature conservation centre.', '绿巴尔干组织在自然保护中心提供访客信息。', 'ארגון הבלקן הירוק מספק מידע למבקרים במרכז לשימור הטבע.', 'Green Balkans oferă informații vizitatorilor la centrul de conservare a naturii.'],
  burgasEnvironment: ['Защитената територия попада в обхвата на РИОСВ – Бургас.', 'The protected area falls within the jurisdiction of the Burgas Regional Inspectorate of Environment and Water.', '保护地在布尔加斯区域环境与水务监察局辖区内。', 'השטח המוגן נמצא בתחום הסמכות של הפיקוח האזורי על הסביבה והמים בבורגס.', 'Zona protejată se află în jurisdicția Inspectoratului Regional de Mediu și Ape din Burgas.'],
  slivenDiocese: ['Действащ храм на Сливенската епархия.', 'An active church of the Bulgarian Orthodox Diocese of Sliven.', '该教堂仍用于礼拜，属保加利亚正教会斯利文教区。', 'כנסייה פעילה של הדיוקסיה האורתודוקסית הבולגרית של סליבן.', 'Biserică activă a Episcopiei Ortodoxe Bulgare de Sliven.'],
  none: ['За достъп и местни правила проверете при общината или на място.', 'Check local access rules with the municipality or on site.', '通行及现场管理规定请向当地市政府查询或到现场核实。', 'בדקו את כללי הגישה עם העירייה או בשטח.', 'Verificați regulile de acces la primărie sau la fața locului.'],
};

export const nearbyLocales = routing.locales;
export const nearbyBase = 'https://sunnybeachamusementpark.com';

export type NearbyPlace = {
  slug: string;
  area: keyof typeof areas;
  access: Access;
  names: string[];
  descriptions: string[];
  address: string;
  destination?: string;
  operator: keyof typeof operators;
  source: keyof typeof sources;
  operatorSource?: keyof typeof sources;
};

export const nearbyPlaces = records as NearbyPlace[];
export const nearbyPhotos: Record<string, { file: string; author: string; license: string; licenseUrl: string }> = photos;

export const nearbyRatings: Record<string, { score: number; count: number; source: string; publisher: string }> = {
  'nesebar-archaeological-museum': {
    score: 4.6, count: 4379,
    source: 'https://mybulgaria.online/en/obiective/nesebar-archaeological-museum', publisher: 'My Bulgaria Online',
  },
  'nesebar-ethnographic-museum': {
    score: 4.2, count: 87,
    source: 'https://kude.bg/obekti/etnografski-muzej-nesebar/', publisher: 'Kude.bg',
  },
};

export function nearbyText(place: NearbyPlace, locale: Locale) {
  const index = nearbyLocales.indexOf(locale);
  return {
    name: place.names[index],
    description: place.descriptions[index],
    operator: operators[place.operator][index],
    source: sources[place.source],
    operatorSource: sources[place.operatorSource ?? place.source],
  };
}

export function nearbyVisit(place: NearbyPlace, locale: Locale) {
  const [history, walk, viewpoint] = visits[place.slug as keyof typeof visits][nearbyLocales.indexOf(locale)];
  return { history, walk, viewpoint };
}

export function nearbyMap(place: NearbyPlace, directions = false) {
  const query = `${place.names[0]}, ${place.address}, България`;
  if (directions) {
    return `https://www.google.com/maps/dir/?${new URLSearchParams({
      api: '1',
      origin: '42.6929674,27.7133825',
      destination: place.destination ?? query,
    })}`;
  }
  return `https://www.google.com/maps/search/?${new URLSearchParams({ api: '1', query })}`;
}

export function nearbyMetadata(path: string, locale: Locale) {
  return {
    canonical: `${nearbyBase}/${locale}${path}`,
    languages: Object.fromEntries([
      ...nearbyLocales.map((language) => [language, `${nearbyBase}/${language}${path}`]),
      ['x-default', `${nearbyBase}/bg${path}`],
    ]),
  };
}
