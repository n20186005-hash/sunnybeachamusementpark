import { routing, type Locale } from '@/i18n/routing';

const labelRows = {
  bg: ['Околни забележителности', 'От Лунапарка до стария Несебър, Свети Влас и Поморие', 'Вижте всички места', 'Основна информация', 'Адрес и ориентир', 'Отговорна организация', 'Работно време и вход', 'Как да стигнете от Лунапарка', 'Google Maps', 'Оценки и отзиви', 'Вижте текущите оценки и отзиви в Google Maps.', 'Източник', 'Снимка', 'Други места наблизо'],
  en: ['Nearby attractions', 'From Luna Park to Old Nesebar, Sveti Vlas and Pomorie', 'See all nearby attractions', 'Essential information', 'Address and landmark', 'Responsible organisation', 'Opening hours and admission', 'Getting there from Luna Park', 'Google Maps', 'Ratings and reviews', 'See the current ratings and visitor reviews on Google Maps.', 'Source', 'Photo', 'More places nearby'],
  zh: ['周边景点', '从阳光海滩游乐园出发，探索内塞巴尔古城、圣弗拉斯和波莫里耶', '查看全部周边景点', '基础信息', '地址与地标', '管理或运营单位', '开放时间与门票', '从阳光海滩游乐园出发', 'Google 地图', '评分与游客评价', '在 Google 地图查看当前评分和游客评价。', '资料来源', '照片', '附近还可以去'],
  he: ['אתרים בסביבה', 'מלונה פארק אל נסבר העתיקה, סווטי ולאס ופומוריה', 'לכל האתרים בסביבה', 'מידע שימושי', 'כתובת ונקודת ציון', 'הגוף האחראי', 'שעות פתיחה וכניסה', 'הגעה מלונה פארק', 'מפות Google', 'דירוגים וביקורות', 'הדירוג והביקורות העדכניים זמינים במפות Google.', 'מקור', 'צילום', 'עוד מקומות בסביבה'],
  ro: ['Atracții în apropiere', 'De la Luna Park la Nessebarul Vechi, Sveti Vlas și Pomorie', 'Toate atracțiile din apropiere', 'Informații esențiale', 'Adresă și reper', 'Organizația responsabilă', 'Program și acces', 'Cum ajungeți de la Luna Park', 'Google Maps', 'Evaluări și recenzii', 'Consultați evaluarea actuală și recenziile vizitatorilor în Google Maps.', 'Sursă', 'Fotografie', 'Alte locuri în apropiere'],
} satisfies Record<Locale, string[]>;

export function nearbyLabels(locale: Locale) {
  const [nearby, subtitle, all, essentials, address, operator, hours, transport, map, reviews,
    reviewsText, source, photo, related] = labelRows[locale];
  return { nearby, subtitle, all, essentials, address, operator, hours, transport, map, reviews,
    reviewsText, source, photo, related };
}

type PlaceText = Record<Locale, string>;

export const areas = {
  old: {
    name: { bg: 'Старинен Несебър', en: 'Old Nesebar', zh: '内塞巴尔古城', he: 'נסבר העתיקה', ro: 'Nessebarul Vechi' },
    transit: { bg: 'С автобус до Стария Несебър, после пеша от крепостната порта по калдъръмените улици.', en: 'Take a bus to Old Nesebar, then walk from the fortress gate along the cobbled streets.', zh: '搭巴士到内塞巴尔古城，下车后从西城门沿石板街步行。', he: 'סעו באוטובוס לנסבר העתיקה והמשיכו ברגל משער המצודה ברחובות המרוצפים.', ro: 'Luați autobuzul spre Nessebarul Vechi și continuați pe jos de la poartă, pe străzile pietruite.' },
  },
  new: {
    name: { bg: 'Нов Несебър', en: 'New Nesebar', zh: '内塞巴尔新城', he: 'נסבר החדשה', ro: 'Nessebarul Nou' },
    transit: { bg: 'С автобус към новия Несебър, после пеша през Южния парк към брега.', en: 'Take a bus toward New Nesebar and walk toward the shore via South Park.', zh: '搭巴士往内塞巴尔新城，再经南公园步行至海岸。', he: 'סעו באוטובוס לנסבר החדשה והמשיכו לחוף דרך פארק הדרום.', ro: 'Luați autobuzul spre Nessebarul Nou și mergeți spre țărm prin Parcul de Sud.' },
  },
  sunny: {
    name: { bg: 'Слънчев бряг', en: 'Sunny Beach', zh: '阳光海滩', he: 'סאני ביץ׳', ro: 'Sunny Beach' },
    transit: { bg: 'От централния Лунапарк продължете пеша до конкретния вход по картата.', en: 'Walk from the central Luna Park to the entrance marked on the map.', zh: '从度假区中心的游乐园步行出发，按景点地图前往对应入口。', he: 'המשיכו ברגל מהלונה פארק המרכזי לכניסה המסומנת במפה.', ro: 'Mergeți pe jos de la Luna Park până la intrarea indicată pe hartă.' },
  },
  ravda: {
    name: { bg: 'Равда и Несебър', en: 'Ravda and Nesebar', zh: '拉夫达与内塞巴尔', he: 'רבדה ונסבר', ro: 'Ravda și Nessebar' },
    transit: { bg: 'Използвайте трансфер на парка, ако работи, или вземете такси до входа край пътя за Равда.', en: 'Use the park shuttle when available or take a taxi to the gate by the Ravda road.', zh: '水上乐园接驳车运行时可乘坐，也可搭出租车到通往拉夫达道路旁的园区入口。', he: 'השתמשו בהסעת הפארק כשהיא פועלת או קחו מונית לשער שליד הדרך לרבדה.', ro: 'Folosiți transferul parcului când circulă sau luați un taxi până la poarta de lângă drumul către Ravda.' },
  },
  vlas: {
    name: { bg: 'Свети Влас', en: 'Sveti Vlas', zh: '圣弗拉斯', he: 'סווטי ולאס', ro: 'Sveti Vlas' },
    transit: { bg: 'С автобус до Свети Влас, после пеша надолу към яхтеното пристанище. Обратният път е нагоре.', en: 'Take a bus to Sveti Vlas and walk downhill to the marina. The return walk climbs uphill.', zh: '搭巴士到圣弗拉斯，再下坡步行到码头。回程需要上坡。', he: 'סעו באוטובוס לסווטי ולאס ורדו ברגל למרינה. הדרך חזרה עולה במדרון.', ro: 'Luați autobuzul spre Sveti Vlas și coborâți pe jos la port. La întoarcere traseul urcă.' },
  },
  north: {
    name: { bg: 'Иракли и Емона', en: 'Irakli and Emona', zh: '伊拉克利与埃莫纳', he: 'אירקלי ואמונה', ro: 'Irakli și Emona' },
    transit: { bg: 'Планирайте отделно пътуване с автомобил. Проверете настилката и разрешения достъп до отбивката преди тръгване.', en: 'Plan a separate drive. Check road conditions and permitted access to the turnoff before leaving.', zh: '建议单独安排驾车前往，出发前核对支路路况与允许通行的范围。', he: 'תכננו נסיעה נפרדת ובדקו מראש את מצב הדרך ואת הגישה המותרת מהפנייה.', ro: 'Planificați un drum separat cu mașina. Verificați starea drumului și accesul permis înainte de plecare.' },
  },
  pomorie: {
    name: { bg: 'Поморие', en: 'Pomorie', zh: '波莫里耶', he: 'פומוריה', ro: 'Pomorie' },
    transit: { bg: 'С автобус към Поморие по линията за Бургас. Изберете спирката според обекта или вземете такси до входа.', en: 'Take a bus toward Pomorie on the Burgas corridor. Choose a stop near the site or take a taxi to the entrance.', zh: '搭经波莫里耶往布尔加斯方向的巴士，按景点选择下车站，也可转出租车到入口。', he: 'סעו באוטובוס לכיוון פומוריה בקו לבורגס. בחרו תחנה קרובה לאתר או קחו מונית לכניסה.', ro: 'Luați autobuzul spre Pomorie pe ruta către Burgas. Alegeți stația apropiată de obiectiv sau luați un taxi până la intrare.' },
  },
} satisfies Record<string, { name: PlaceText; transit: PlaceText }>;

const accessRows = {
  outdoor: ['Разглеждане отвън от обществената алея или улица.', 'View the exterior from the public path or street.', '可从公共步道或街道外观。', 'אפשר לצפות מבחוץ מהשביל או מהרחוב הציבורי.', 'Exteriorul se poate vedea de pe aleea sau strada publică.'],
  district: ['Улиците са свободно достъпни. Отделните обекти имат собствен режим.', 'Public streets are open to walk. Individual sites set their own hours and admission.', '古城公共街道可步行游览，各场馆有各自的开放和售票安排。', 'הרחובות הציבוריים פתוחים להליכה. לכל אתר שעות כניסה משלו.', 'Străzile publice sunt accesibile pe jos. Obiectivele au program și tarife proprii.'],
  museum: ['Проверете сезонния график, билета и последното влизане при Музей „Старинен Несебър“.', 'Check seasonal opening, tickets and last entry with the Museum of Ancient Nesebar.', '向内塞巴尔古城博物馆查询当季开放、票价和最后入场时间。', 'בדקו שעות עונתיות, כרטיסים וכניסה אחרונה מול מוזיאון נסבר העתיקה.', 'Verificați programul sezonier, biletele și ultima intrare la Muzeul Nessebarul Vechi.'],
  beach: ['Проверете сезонното водно спасяване и табелите за платени услуги.', 'Check seasonal lifeguard coverage and posted charges for beach services.', '留意救生员值勤季节及现场海滩服务收费牌。', 'בדקו את עונת פעילות המצילים ואת מחירי השירותים המוצגים בחוף.', 'Verificați prezența sezonieră a salvamarilor și tarifele afișate pentru servicii.'],
  venue: ['Проверете общинската програма, достъпа и билетите за конкретното събитие.', 'Check the municipal programme, access and tickets for the specific event.', '查看市政府活动节目表，核对场次的入场与购票规定。', 'בדקו בתוכנית העירונית את הגישה והכרטיסים לאירוע המסוים.', 'Verificați programul municipal, accesul și biletele pentru evenimentul ales.'],
  park: ['Обектът е сезонен и с билети. Проверете календара и ограниченията на оператора.', 'Admission is ticketed and seasonal. Check the operator’s calendar and ride restrictions.', '园区季节性营业，需购票。出发前查看运营方日历与设施使用限制。', 'הכניסה בתשלום ובעונה בלבד. בדקו את לוח הפעילות והמגבלות של המפעיל.', 'Accesul se face cu bilet, în sezon. Verificați calendarul operatorului și restricțiile instalațiilor.'],
  marina: ['Проверете табелите за обществената алея и ограничения достъп до яхтените кейове.', 'Follow public promenade signs and observe access restrictions on yacht piers.', '按标识走公共步道，留意游艇泊位和栈桥的通行限制。', 'עקבו אחר השילוט לטיילת הציבורית וכבדו את מגבלות הגישה לרציפי היאכטות.', 'Urmați indicatoarele promenadei publice și respectați restricțiile de acces la pontoane.'],
  nature: ['Посещавайте по светло и следвайте местните ограничения за достъп.', 'Visit in daylight and follow local access restrictions.', '建议白天到访，并遵守现场通行限制。', 'בקרו באור יום ופעלו לפי מגבלות הגישה המקומיות.', 'Vizitați pe lumină și respectați restricțiile locale de acces.'],
  pomMuseum: ['Община Поморие публикува сезонни часове и цени за музейните обекти.', 'Pomorie Municipality publishes seasonal hours and prices for its museum sites.', '波莫里耶市政府发布馆点的季节性开放时间和票价。', 'עיריית פומוריה מפרסמת שעות ומחירים עונתיים לאתרי המוזיאונים.', 'Primăria Pomorie publică programul și tarifele sezoniere pentru obiectivele muzeale.'],
  worship: ['Проверете достъпа на входа и съобразете посещението с богослуженията.', 'Check access at the gate and plan your visit around services.', '在入口核对参观安排，礼拜时请配合修道院规定。', 'בדקו את הגישה בשער ותכננו את הביקור בהתאם לתפילות.', 'Verificați accesul la poartă și planificați vizita în funcție de slujbe.'],
} satisfies Record<string, string[]>;

export type Access = keyof typeof accessRows;
export const nearbyAccess = (access: Access, locale: Locale) =>
  accessRows[access][routing.locales.indexOf(locale)];

const visitRows = {
  bg: ['Около Лунапарка', 'За обекта и неговото управление', 'История и какво да разгледате', 'Маршрут пеша', 'Къде да снимате', 'Често задавани въпроси', 'Какъв е достъпът?', 'Как да намеря правилния вход или подход?', 'Упътване от Лунапарка', 'Разгледайте още места по Черноморието, от Стария Несебър до Поморие.'],
  en: ['Explore around Luna Park', 'About the site and its management', 'History and what to look for', 'Walking route', 'Where to take photos', 'Frequently asked questions', 'What access is available?', 'How do I find the right entrance or approach?', 'Directions from Luna Park', 'Explore more of the Black Sea coast, from Old Nesebar to Pomorie.'],
  zh: ['周边游览', '关于景点与管理单位', '历史与现场看点', '步行游览路线', '拍摄机位', '常见问答', '如何参观这个景点？', '怎样确认正确的入口或游览起点？', '从阳光海滩游乐园导航', '从内塞巴尔古城到波莫里耶，沿黑海海岸继续游览。'],
  he: ['טיולים סביב הלונה פארק', 'על האתר ועל ניהולו', 'היסטוריה ומה כדאי לראות', 'מסלול הליכה', 'נקודות צילום', 'שאלות נפוצות', 'מהם תנאי הגישה?', 'איך מוצאים את הכניסה או את דרך הגישה?', 'הוראות הגעה מהלונה פארק', 'גלו עוד מחופי הים השחור, מנסבר העתיקה עד פומוריה.'],
  ro: ['Explorați împrejurimile Luna Park', 'Despre obiectiv și administrarea sa', 'Istorie și repere de observat', 'Traseu pe jos', 'Locuri pentru fotografii', 'Întrebări frecvente', 'În ce condiții se poate vizita?', 'Cum găsesc intrarea sau punctul de acces?', 'Indicații de la Luna Park', 'Descoperiți litoralul Mării Negre, de la Nessebarul Vechi la Pomorie.'],
} satisfies Record<Locale, string[]>;

export function nearbyVisitLabels(locale: Locale) {
  const [homeTitle, about, history, walk, viewpoint, faq, accessQuestion, entranceQuestion, directions, homeLead] = visitRows[locale];
  return { homeTitle, about, history, walk, viewpoint, faq, accessQuestion, entranceQuestion, directions, homeLead };
}
