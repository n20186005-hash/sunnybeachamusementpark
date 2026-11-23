import { routing, type Locale } from '@/i18n/routing';
import type { NearbyPlace } from './nearby';
import highlightRows from './nearby-highlights.json';

const labels = {
  bg: ['Открийте мястото', 'Съвети за посещение', 'Акценти', 'Вид обект', 'Район', 'Работно време', 'Билети и цени', 'Важни условия', 'Къде да отседнете', 'Адрес и упътване', 'Тарифа за 2026 г.', 'Индивидуален билет за възрастен', 'Индивидуален билет за дете', 'Публикуван график за 2026 г.'],
  en: ['Discover the site', 'Planning your visit', 'Highlights', 'Site type', 'Area', 'Opening hours', 'Tickets and prices', 'Visitor notes', 'Where to stay', 'Address and directions', '2026 tariff', 'Individual adult ticket', 'Individual child ticket', 'Published 2026 schedule'],
  zh: ['探索景点', '游览建议', '景区特色', '景点类型', '所在地区', '开放时间', '门票价格', '游览须知', '住宿建议', '地址与交通指南', '2026 年公布票价', '成人散客票', '儿童散客票', '2026 年公布时段'],
  he: ['גלו את האתר', 'תכנון הביקור', 'מוקדי עניין', 'סוג האתר', 'אזור', 'שעות פתיחה', 'כרטיסים ומחירים', 'הערות למבקרים', 'איפה ללון', 'כתובת והוראות הגעה', 'תעריף 2026', 'כרטיס מבוגר ליחיד', 'כרטיס ילד ליחיד', 'לוח הזמנים שפורסם לשנת 2026'],
  ro: ['Descoperiți obiectivul', 'Planificarea vizitei', 'Puncte de interes', 'Tipul obiectivului', 'Zonă', 'Program', 'Bilete și tarife', 'Informații utile', 'Unde să vă cazați', 'Adresă și indicații', 'Tariful pentru 2026', 'Bilet individual pentru adult', 'Bilet individual pentru copil', 'Program publicat pentru 2026'],
} satisfies Record<Locale, string[]>;

const kinds = {
  outdoor: ['Обект на открито', 'Outdoor landmark', '户外地标', 'אתר פתוח', 'Reper în aer liber'],
  district: ['Исторически квартал', 'Historic district', '历史城区', 'רובע היסטורי', 'Cartier istoric'],
  museum: ['Музеен обект', 'Museum site', '博物馆及附属展馆', 'אתר מוזיאלי', 'Obiectiv muzeal'],
  beach: ['Морски плаж', 'Seaside beach', '海滨沙滩', 'חוף ים', 'Plajă marină'],
  venue: ['Сцена на открито', 'Open-air venue', '露天演出场地', 'אתר מופעים פתוח', 'Scenă în aer liber'],
  park: ['Аквапарк', 'Water park', '水上乐园', 'פארק מים', 'Parc acvatic'],
  marina: ['Яхтено пристанище', 'Yacht marina', '游艇码头', 'מרינה ליאכטות', 'Port de iahturi'],
  nature: ['Природна забележителност', 'Natural attraction', '自然景点', 'אתר טבע', 'Obiectiv natural'],
  pomMuseum: ['Музеен обект', 'Museum site', '博物馆及附属展馆', 'אתר מוזיאלי', 'Obiectiv muzeal'],
  worship: ['Действащ храм', 'Active religious site', '在用宗教场所', 'אתר דתי פעיל', 'Lăcaș de cult activ'],
};

const hours = {
  outdoor: ['За оглед отвън изберете светлата част на деня.', 'Visit in daylight for exterior views.', '外观建议白天游览，室内开放另行核对。', 'מומלץ להגיע באור יום לתצפית מבחוץ.', 'Pentru exterior, veniți pe lumină.'],
  district: ['Улиците са обществени. Музеите и църквите имат отделен график.', 'Public streets are open to pedestrians. Museums and churches have their own schedules.', '公共街道供步行游览，博物馆与教堂各有开放安排。', 'הרחובות הציבוריים פתוחים להולכי רגל. למוזיאונים ולכנסיות שעות משלהם.', 'Străzile publice sunt accesibile pietonilor. Muzeele și bisericile au programe proprii.'],
  museum: ['Работното време зависи от сезона и обекта.', 'Opening hours vary by venue and season.', '开放时间按场馆和季节调整。', 'שעות הפתיחה משתנות לפי האתר והעונה.', 'Programul diferă în funcție de obiectiv și sezon.'],
  beach: ['Графикът на спасителите и услугите е сезонен.', 'Lifeguard coverage and beach services are seasonal.', '救生员值勤及海滩服务有季节性。', 'שירותי ההצלה והחוף עונתיים.', 'Salvamarii și serviciile de plajă au program sezonier.'],
  venue: ['Достъпът при събития следва обявения час.', 'On event days, follow the announced admission time.', '演出日入场时间按具体活动公告。', 'בימי אירוע יש לפעול לפי שעת הכניסה שפורסמה.', 'În zilele cu evenimente se aplică ora de acces anunțată.'],
  park: ['Летният сезон има начални и крайни дати, които операторът обявява.', 'The operator publishes dates and hours for each summer season.', '水上乐园按夏季运营，日期与时段由园区发布。', 'המפעיל מפרסם תאריכים ושעות לכל עונת קיץ.', 'Operatorul publică datele și orele fiecărui sezon de vară.'],
  marina: ['Следвайте табелите за достъп по обществената алея и понтоните.', 'Follow posted access notices for the public promenade and pontoons.', '公共步道及浮桥的通行范围以现场标示为准。', 'עקבו אחר שילוט הגישה לטיילת הציבורית ולמעגנים.', 'Urmați indicatoarele de acces pe promenadă și pontoane.'],
  nature: ['Планирайте посещение по светло и спазвайте ограниченията на терен.', 'Plan a daylight visit and observe any posted closures.', '建议白天到访，遵守现场封闭及保护区通行告示。', 'תכננו ביקור באור יום וכבדו סגירות מסומנות.', 'Planificați vizita pe lumină și respectați restricțiile afișate.'],
  pomMuseum: ['Проверете общинския график за конкретната дата.', 'Check the municipal schedule for your date.', '出发前核对市政府当日开放安排。', 'בדקו את לוח הזמנים העירוני לתאריך הביקור.', 'Verificați programul municipal pentru data vizitei.'],
  worship: ['Достъпът за посещение зависи от богослуженията и състоянието на входа.', 'Visitor access depends on services and whether the gate is open.', '入内参观视礼拜安排和现场开门情况。', 'הביקור תלוי בזמני תפילה ובפתיחת השער.', 'Accesul depinde de slujbe și de deschiderea porții.'],
};

const admission = {
  outdoor: ['Огледът от обществената улица или алея е без билет.', 'Exterior viewing from the public street or path is free.', '从公共街道或步道欣赏外观，无需门票。', 'תצפית מהרחוב או השביל הציבורי אינה כרוכה בתשלום.', 'Observarea din stradă sau de pe aleea publică este gratuită.'],
  district: ['Разходката по обществените улици е без билет.', 'Walking the public streets is free. Individual attractions may charge admission.', '古城公共街道免费步行，部分室内景点另行购票。', 'ההליכה ברחובות הציבוריים חופשית. אתרים מסוימים גובים דמי כניסה.', 'Plimbarea pe străzile publice este gratuită. Unele obiective au bilet separat.'],
  museum: ['Проверете тарифата на музея за конкретния обект и билет.', 'Check the museum tariff for the site and ticket category.', '按馆方票价表核对具体场馆及票种。', 'בדקו בתעריפי המוזיאון לאתר ולסוג הכרטיס.', 'Verificați tariful muzeului pentru obiectiv și categoria de bilet.'],
  beach: ['Проверете отделните цени за чадър, шезлонг и други услуги на плажа.', 'Check posted prices for umbrellas, loungers and other optional beach services.', '遮阳伞、躺椅等另收费服务请看现场价目表。', 'בדקו את המחירים לשמשיות, כיסאות נוח ושירותים נוספים.', 'Verificați tarifele afișate pentru umbrele, șezlonguri și alte servicii.'],
  venue: ['Цената или свободният вход се обявяват за всяко събитие.', 'Admission or free entry is announced for each event.', '票价或免费入场安排按活动分别公布。', 'מחיר הכניסה או כניסה חופשית מפורסמים לכל אירוע.', 'Prețul sau accesul gratuit sunt anunțate pentru fiecare eveniment.'],
  park: ['Входът е с билет. Проверете цената за датата и условията за ръст.', 'A ticket is required. Check the price for your date and any height-based categories.', '需购票，按计划到访日期与身高分档核对票价。', 'נדרש כרטיס. בדקו את המחיר לתאריך ואת קטגוריות הגובה.', 'Este necesar bilet. Verificați tariful pentru dată și categoriile de înălțime.'],
  marina: ['Предварително проверете цените за разходки с лодка или услуги на марината.', 'Check boat trips and marina services separately for prices.', '游船与码头服务另行向经营方核价。', 'בדקו בנפרד את מחירי ההפלגות ושירותי המרינה.', 'Verificați separat prețurile excursiilor cu barca și ale serviciilor.'],
  nature: ['Общественият подход не изисква музеен билет. Частните услуги се заплащат отделно.', 'No museum ticket is needed on the public approach. Private services may charge separately.', '公共游览通道无需场馆门票，私人服务费用另计。', 'אין צורך בכרטיס מוזיאון בגישה הציבורית. שירותים פרטיים עשויים לעלות בנפרד.', 'Pe accesul public nu este necesar bilet de muzeu. Serviciile private pot avea tarife separate.'],
  pomMuseum: ['Входът е с билет. Проверете актуалната тарифа на касата.', 'Admission is ticketed. Ask at the desk for the current tariff.', '入馆需购票，当前票价与优惠资格请向售票处核对。', 'נדרש כרטיס כניסה. בדקו בדלפק את התעריף העדכני.', 'Intrarea se face cu bilet. Întrebați la casă tariful actual.'],
  worship: ['За групово посещение или дарение попитайте на входа.', 'Ask at the entrance about group visits or donations.', '团体参观或捐献安排请在入口向场所询问。', 'שאלו בכניסה לגבי ביקור קבוצתי או תרומות.', 'Întrebați la intrare despre vizite de grup sau donații.'],
};

const stay = {
  old: ['За разходки отседнете в Стария град или близо до провлака.', 'Stay in the old town or near the causeway for easy walks to the historic sites.', '以古城漫步为主，可住古城内或堤道入口附近。', 'לסיורים ברגל, בחרו לינה בעיר העתיקה או ליד הסוללה.', 'Pentru vizite pe jos, alegeți orașul vechi sau zona istmului.'],
  new: ['За плаж избирайте място близо до Южния парк.', 'For beach access, look near South Park in New Nesebar.', '以南海滩为主，可住新城南公园附近。', 'לגישה לחוף, חפשו לינה ליד פארק הדרום בנסבר החדשה.', 'Pentru plajă, căutați cazare lângă Parcul de Sud.'],
  sunny: ['Настаняване в централния курорт улеснява достъпа до алеята и Лунапарка.', 'Central Sunny Beach puts the promenade and Luna Park within easy reach.', '兼顾游乐园与海滨散步，可住阳光海滩中心区。', 'לינה במרכז סאני ביץ׳ נוחה לטיילת וללונה פארק.', 'În centrul stațiunii ajungeți ușor la promenadă și Luna Park.'],
  ravda: ['Сравнете места в Равда и Несебър според спирките на трансфера.', 'Compare Ravda and Nesebar accommodation against the shuttle stops.', '比较拉夫达和内塞巴尔的住宿时，可先看离水上乐园接驳站有多远。', 'השוו לינה ברבדה ובנסבר לפי תחנות ההסעה.', 'Comparați cazarea din Ravda și Nessebar după stațiile transferului.'],
  vlas: ['За пристанището търсете място близо до брега, ако искате да избегнете изкачването.', 'Stay near the waterfront if you want to avoid the uphill walk from the marina.', '想少走码头回镇上的坡路，可选海滨住宿。', 'בחרו לינה ליד המים אם תרצו להימנע מהעלייה מהמרינה.', 'Alegeți cazare aproape de mal dacă doriți să evitați urcarea din port.'],
  north: ['За дневна екскурзия може да нощувате в Обзор или Слънчев бряг и да планирате автомобилния достъп.', 'Base yourself in Obzor or Sunny Beach for a day trip and plan the drive in advance.', '可住奥布佐尔或阳光海滩，把这里排成单独的自驾日游。', 'אפשר ללון באובזור או בסאני ביץ׳ ולתכנן מראש טיול יום ברכב.', 'Pentru o excursie de o zi, stați în Obzor sau Sunny Beach și planificați drumul din timp.'],
  pomorie: ['За музеите и старите квартали изберете настаняване на полуострова.', 'For the museums and old streets, look for accommodation on the Pomorie peninsula.', '以博物馆和老城街巷为主，可住波莫里耶半岛上。', 'למוזיאונים ולרחובות העתיקים, חפשו לינה בחצי האי פומוריה.', 'Pentru muzee și străzile vechi, căutați cazare pe peninsula Pomorie.'],
};

const museumTariffs: Record<string, [number, number]> = {
  'nesebar-archaeological-museum': [4.60, 2.30],
  'nesebar-ethnographic-museum': [3.07, 1.53],
  'st-stephen': [4.60, 2.30],
  'st-saviour': [2.56, 1.53],
  'st-paraskeva': [2.56, 1.53],
  'st-john-baptist': [2.56, 1.53],
};

const schedules: Record<string, string[][]> = {
  'action-aquapark': [
    ['18 май–15 юни и 4–28 септ.: 10:00–17:00.', '18 May–15 Jun and 4–28 Sep: 10:00–17:00.', '5 月 18 日至 6 月 15 日、9 月 4 日至 28 日，10:00–17:00。', '18 במאי עד 15 ביוני ו־4 עד 28 בספטמבר: 10:00–17:00.', '18 mai–15 iun. și 4–28 sept.: 10:00–17:00.'],
    ['16 юни–3 септ.: 10:00–18:00.', '16 Jun–3 Sep: 10:00–18:00.', '6 月 16 日至 9 月 3 日，10:00–18:00。', '16 ביוני עד 3 בספטמבר: 10:00–18:00.', '16 iun.–3 sept.: 10:00–18:00.'],
  ],
  'aqua-paradise': [
    ['26 май–13 септ.: 10:00–18:00. В началото и края на сезона е имало ограничен достъп само за гости на комплекса.', '26 May–13 Sep: 10:00–18:00. In the shoulder periods, limited access was reserved for resort guests.', '5 月 26 日至 9 月 13 日，10:00–18:00。该季首尾部分时段仅向度假村住客有限开放。', '26 במאי עד 13 בספטמבר: 10:00–18:00. בשולי העונה הותרה כניסה מוגבלת לאורחי אתר הנופש בלבד.', '26 mai–13 sept.: 10:00–18:00. La începutul și finalul sezonului, accesul limitat era rezervat oaspeților complexului.'],
  ],
  'pomorie-salt-museum': [
    ['1 окт.–31 май: пон.–пет. 08:00–16:00, съб. 10:00–16:00, нед. почивен ден.', '1 Oct–31 May: Mon–Fri 08:00–16:00, Sat 10:00–16:00, Sun closed.', '10 月 1 日至次年 5 月 31 日，周一至周五 08:00–16:00，周六 10:00–16:00，周日闭馆。', '1 באוקטובר עד 31 במאי: ב׳–ו׳ 08:00–16:00, שבת 10:00–16:00, א׳ סגור.', '1 oct.–31 mai: luni–vineri 08:00–16:00, sâmbătă 10:00–16:00, duminică închis.'],
    ['1 юни–30 септ.: пон.–пет. 08:00–18:00, съб.–нед. 10:00–18:00.', '1 Jun–30 Sep: Mon–Fri 08:00–18:00, Sat–Sun 10:00–18:00.', '6 月 1 日至 9 月 30 日，周一至周五 08:00–18:00，周末 10:00–18:00。', '1 ביוני עד 30 בספטמבר: ב׳–ו׳ 08:00–18:00, שבת–א׳ 10:00–18:00.', '1 iun.–30 sept.: luni–vineri 08:00–18:00, sâmbătă–duminică 10:00–18:00.'],
  ],
  'pomorie-thracian-tomb': [
    ['1 ноем.–31 март: с предварителна заявка.', '1 Nov–31 Mar: advance booking required.', '11 月 1 日至次年 3 月 31 日须提前预约。', '1 בנובמבר עד 31 במרץ: בתיאום מראש.', '1 nov.–31 mart.: pe bază de programare.'],
    ['1–30 април и 1–30 май: ср.–нед. 10:00–16:00.', '1 Apr–30 May: Wed–Sun 10:00–16:00.', '4 月 1 日至 5 月 30 日，周三至周日 10:00–16:00。', '1 באפריל עד 30 במאי: ד׳–א׳ 10:00–16:00.', '1 apr.–30 mai: miercuri–duminică 10:00–16:00.'],
    ['1 юни–30 септ.: пон.–пет. 09:00–18:00, съб.–нед. 10:00–18:00.', '1 Jun–30 Sep: Mon–Fri 09:00–18:00, Sat–Sun 10:00–18:00.', '6 月 1 日至 9 月 30 日，周一至周五 09:00–18:00，周末 10:00–18:00。', '1 ביוני עד 30 בספטמבר: ב׳–ו׳ 09:00–18:00, שבת–א׳ 10:00–18:00.', '1 iun.–30 sept.: luni–vineri 09:00–18:00, sâmbătă–duminică 10:00–18:00.'],
  ],
  'pomorie-historical-museum': [
    ['1 окт.–30 юни: пон.–пет. 08:30–17:00, почивка 12:30–13:00; съб. 10:00–16:00; нед. почивен ден.', '1 Oct–30 Jun: Mon–Fri 08:30–17:00 with a 12:30–13:00 break. Sat 10:00–16:00. Sun closed.', '10 月 1 日至次年 6 月 30 日，周一至周五 08:30–17:00，12:30–13:00 休息。周六 10:00–16:00，周日闭馆。', '1 באוקטובר עד 30 ביוני: ב׳–ו׳ 08:30–17:00, הפסקה 12:30–13:00. שבת 10:00–16:00, א׳ סגור.', '1 oct.–30 iun.: luni–vineri 08:30–17:00, pauză 12:30–13:00. Sâmbătă 10:00–16:00, duminică închis.'],
    ['1 юли–30 септ.: пон.–пет. 09:00–18:00, почивка 12:00–13:00; съб.–нед. 10:00–18:00.', '1 Jul–30 Sep: Mon–Fri 09:00–18:00 with a 12:00–13:00 break. Sat–Sun 10:00–18:00.', '7 月 1 日至 9 月 30 日，周一至周五 09:00–18:00，12:00–13:00 休息。周末 10:00–18:00。', '1 ביולי עד 30 בספטמבר: ב׳–ו׳ 09:00–18:00, הפסקה 12:00–13:00. שבת–א׳ 10:00–18:00.', '1 iul.–30 sept.: luni–vineri 09:00–18:00, pauză 12:00–13:00. Sâmbătă–duminică 10:00–18:00.'],
  ],
};

const actionHours = 'https://aquapark.bg/about-us/opening-hours/';
const actionPrices = 'https://aquapark.bg/about-us/prices/';
const pomorieHours = 'https://www.pomorie.bg/polezno/muzeyni-obekti/';
const nesebarTariff = 'https://www.ancient-nessebar.com/html/main_en.php?menu=price';
const nesebarHours = 'https://visitnessebar.bg/visit-placeen/67';
const paradiseHours = 'https://nessebaraquapark.com/contacts/';

export function nearbyPractical(place: NearbyPlace, locale: Locale) {
  const i = routing.locales.indexOf(locale);
  const [intro, tips, highlights, type, district, opening, tickets, notes, lodging, guide, tariffLabel, adult, child, scheduleLabel] = labels[locale];
  const hourSource = place.access === 'pomMuseum' ? pomorieHours
    : place.access === 'museum' ? nesebarHours
    : place.slug === 'action-aquapark' ? actionHours
    : place.slug === 'aqua-paradise' ? paradiseHours : undefined;
  const ticketSource = place.access === 'museum' ? nesebarTariff
    : place.slug === 'action-aquapark' ? actionPrices
    : place.slug === 'aqua-paradise' ? 'https://nessebaraquapark.com/' : undefined;

  return {
    intro, tips, highlights, type, district, opening, tickets, notes, lodging, guide,
    tariffLabel, adult, child, scheduleLabel, hourSource, ticketSource,
    kind: kinds[place.access][i], hours: hours[place.access][i],
    highlight: highlightRows[place.slug as keyof typeof highlightRows][i],
    admission: admission[place.access][i], stay: stay[place.area][i],
    ticket: museumTariffs[place.slug],
    schedule: schedules[place.slug]?.map((line) => line[i]) ?? [],
  };
}
