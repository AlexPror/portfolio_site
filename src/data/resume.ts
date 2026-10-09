export type ResumeMode = 'constructor' | 'automation'

export interface ResumeJob {
  company: string
  url?: string
  location?: string
  industry?: string
  period: string
  duration: string
  role: string
  bullets: string[]
  achievements?: string[]
  achievementsCta?: { label: string; href: string }
}

export interface ResumeEducation {
  school: string
  year: string
  degree: string
  faculty: string
}

export interface ResumeDriveItem {
  label: string
  href: string
  note?: string
}

export interface ResumeCadSkill {
  name: string
  level: string
  href: string
  note: string
}

export interface ResumeModeMeta {
  id: ResumeMode
  tabLabel: string
  tabHint: string
  badge: string
}

export interface ResumeProfile {
  id: ResumeMode
  updatedAt: string
  fullName: string
  genderAge: string
  phone: string
  email: string
  city: string
  citizenship: string
  workFormat: string
  desiredRole: string
  portfolioUrl: string
  telegramUrl: string
  githubUrl: string
  examplesUrl: string
  drivePortfolioUrl: string
  specializations: string[]
  highlights: { value: string; label: string }[]
  about: string
  /** Короткая пометка для конструкторского профиля */
  sideNote?: string
  experienceYears: string
  jobs: ResumeJob[]
  education: ResumeEducation[]
  languages: { name: string; level: string }[]
  skills: string[]
  /** Блок CAD с ссылками на кейсы */
  cadSkills: ResumeCadSkill[]
  links: { label: string; href: string }[]
  drive: ResumeDriveItem[]
  license: string
}

const DRIVE_ALL =
  'https://drive.google.com/drive/folders/1dg9UjnDy0h3Q7EMBN4qFjPmEU1qHJJs-?hl=ru'

const shared = {
  updatedAt: '9 октября 2026',
  fullName: 'Воробьёв Александр Сергеевич',
  genderAge: 'Мужчина, 37 лет, родился 6 декабря 1988',
  phone: '+7 (910) 529-04-65',
  email: 'vorobjev.alexandr-2017@yandex.ru',
  city: 'Кондрово',
  citizenship: 'Россия, разрешение на работу: Россия',
  portfolioUrl: 'https://vorobjev.pro',
  telegramUrl: 'https://t.me/Alexandr_Vorobjev',
  githubUrl: 'https://github.com/AlexPror',
  examplesUrl: DRIVE_ALL,
  drivePortfolioUrl: DRIVE_ALL,
  experienceYears: '6 лет 4 месяца',
  education: [
    {
      school: 'Филиал МГТУ им. Н.Э. Баумана, Калуга',
      year: '2014',
      degree: 'Высшее',
      faculty: 'Конструкторско-механический — газотурбинные и паротурбинные установки и двигатели',
    },
    {
      school: 'Инновационный Евразийский университет, Павлодар',
      year: '2009',
      degree: 'Высшее',
      faculty: 'Инженерная академия — промышленная теплоэнергетика',
    },
  ] as ResumeEducation[],
  languages: [
    { name: 'Русский', level: 'Родной' },
    { name: 'Английский', level: 'B1 — читаю спецификации и чертежи' },
    { name: 'Немецкий', level: 'B1' },
  ],
  license: 'Права категорий B, C, D · свой автомобиль',
  drive: [
    {
      label: 'Все примеры работ',
      href: DRIVE_ALL,
      note: 'Общая папка с комплектами КД',
    },
    {
      label: 'Проект замены размольного ротора — сложные чертежи',
      href: 'https://drive.google.com/drive/folders/1vA1d-N0qeJdSCvTF-K1Fwl2EkMiKse4v?hl=ru',
      note: 'КД с допусками и посадками: вал, нож, сито, лобовина',
    },
    {
      label: 'Дефектовка 3D-сканирования цеха БДМ',
      href: 'https://drive.google.com/drive/folders/1By7-Yrl7-xRkiGSYuQhnTVXf9aoPvLAE?hl=ru',
      note: 'Большие модели цеха; правка через Revit ↔ AutoCAD ↔ SolidWorks',
    },
    {
      label: 'Листовой металл — КОМПАС / SolidWorks',
      href: 'https://drive.google.com/drive/folders/1yXbK8TbtuUlDRFJaUhckzrAIA_363ehW?hl=ru',
      note: 'Развёртки, гибка, лазер',
    },
    {
      label: 'Чертежи кронштейнов — AutoCAD',
      href: 'https://drive.google.com/drive/folders/1_j-SSbfP4sAnqr4GJjZpeH9_I-F1dMBY?hl=ru',
      note: '2D КД, узлы крепления',
    },
    {
      label: 'Оборудование — SolidWorks',
      href: 'https://drive.google.com/drive/folders/1t7WvDZPXVkNFbST9CN959nsKhF5TOpAu?hl=ru',
      note: 'Сборки, детали, узлы',
    },
  ] as ResumeDriveItem[],
}

const cadSkillsConstructor: ResumeCadSkill[] = [
  {
    name: 'КОМПАС-3D',
    level: 'Основной инструмент · 3D, чертежи, спецификации, листовой металл',
    href: 'https://vorobjev.pro/kompas',
    note: 'Кейсы на сайте →',
  },
  {
    name: 'SolidWorks',
    level: 'Сборки, детали, развёртки, пакет в цех (DXF/PDF)',
    href: 'https://vorobjev.pro/solidworks',
    note: 'Кейсы на сайте →',
  },
  {
    name: 'AutoCAD',
    level: '2D КД, узлы, кронштейны, обмеры',
    href: 'https://drive.google.com/drive/folders/1_j-SSbfP4sAnqr4GJjZpeH9_I-F1dMBY?hl=ru',
    note: 'Примеры на Drive →',
  },
]

const cadSkillsAutomation: ResumeCadSkill[] = [
  {
    name: 'КОМПАС-3D + COM/API',
    level: 'КД + автоматизация типовых комплектов, штампы, выгрузки',
    href: 'https://vorobjev.pro/kompas',
    note: 'Кейсы КОМПАС →',
  },
  {
    name: 'SolidWorks + API',
    level: 'Модели и add-in: DXF, развёртки, PDF-альбом в цех',
    href: 'https://vorobjev.pro/solidworks',
    note: 'Кейсы SolidWorks →',
  },
  {
    name: 'AutoCAD',
    level: '2D КД и связка с объёмными моделями цеха',
    href: 'https://drive.google.com/drive/folders/1_j-SSbfP4sAnqr4GJjZpeH9_I-F1dMBY?hl=ru',
    note: 'Чертежи на Drive →',
  },
  {
    name: 'Revit + API',
    level: 'Листы КМД, размеры, маркировка под фасады',
    href: 'https://vorobjev.pro/revit',
    note: 'Кейсы Revit →',
  },
]

export const resumeModeList: ResumeModeMeta[] = [
  {
    id: 'constructor',
    tabLabel: 'Конструктор',
    tabHint: 'КД · ЕСКД · КОМПАС / SolidWorks / AutoCAD',
    badge: 'Профиль для КБ и производства',
  },
  {
    id: 'automation',
    tabLabel: 'Автоматизация производства',
    tabHint: 'Полный цикл · плагины CAD · пакет в цех',
    badge: 'Профиль для заказной автоматизации',
  },
]

const jobsConstructor: ResumeJob[] = [
  {
    company: 'ООО «Техностайл»',
    url: 'https://nordfox.ru/',
    location: 'Москва',
    industry: 'Строительство / навесные фасады',
    period: 'Февраль 2026 — настоящее время',
    duration: '8 месяцев',
    role: 'Ведущий инженер-конструктор',
    bullets: [
      'Проектирование модулей навесного фасада: 3D-модели, альбомы КМ и КМД (виды, разрезы, изометрия), согласование узлов со смежными разделами.',
      'Моделирование листовых деталей (панели, кассеты, отливы): развёртки под гибку и лазер, толщины и материалы, рабочие чертежи.',
      'Рамы и каркасные узлы (плоский и угловой модуль): профили, кронштейны, крепёж, привязка к осям здания.',
      'Ведение общей спецификации фасада: состав, количества, привязка к чертежам и заказам в производство.',
      'Дополнительно: ускоряю выпуск типовых комплектов КМД утилитами под регламент отдела (при необходимости).',
    ],
    achievements: [
      'Единый порядок выпуска КМД и спецификации: меньше расхождений между моделью, альбомом и заказом в цех.',
    ],
  },
  {
    company: 'ООО «БЕЙОНД РУС»',
    location: 'Москва',
    industry: 'ЖКХ / вентиляция',
    period: 'Август 2025 — Февраль 2026',
    duration: '7 месяцев',
    role: 'Инженер-конструктор (самозанятый)',
    bullets: [
      'Конструкции конвекторов, шкафов и корпусов из листового металла (08пс, нержавейка): 3D в КОМПАС-3D и SolidWorks, развёртки, гибочные и лазерные чертежи по ЕСКД.',
      'Узлы сборки: крепёж, уплотнения, посадки под комплектующие; правки по замечаниям производства и ОТК.',
      'Допуски, посадки, шероховатость; сопровождение от эскиза до пилотной партии и серии.',
      'Комплекты КД: сборочные и деталировочные чертежи, спецификации, перечни покупных.',
    ],
    achievements: [
      'Типовые изделия цеха переведены на повторяемый выпуск КД по единым шаблонам.',
    ],
  },
  {
    company: 'ООО «ГеоПак»',
    url: 'https://geopack.ru/',
    location: 'Кондрово',
    industry: 'ЦБП / деревообработка',
    period: 'Октябрь 2024 — Август 2025',
    duration: '11 месяцев',
    role: 'Инженер-конструктор',
    bullets: [
      'Валы, редукторы, подшипниковые узлы, рамы, металлоконструкции в SolidWorks, AutoCAD и Plant 3D; допуски, посадки, шероховатость.',
      'Обмеры на объекте и по 3D-сканированию; комплекты КМ, КМД, Р.',
      'Сверка моделей с лазерным сканом цеха, устранение расхождений до состояния «можно проектировать и отдавать в производство».',
      'ТЗ и комплекты документации для подрядных изготовителей; согласование со смежниками.',
    ],
    achievements: [
      'Модели цеха после сканирования доведены до рабочего состояния для проектирования.',
    ],
    achievementsCta: {
      label: 'Примеры работ (Google Drive)',
      href: DRIVE_ALL,
    },
  },
  {
    company: 'ПАО «КАДВИ»',
    location: 'Калуга',
    period: 'Ноябрь 2022 — Январь 2023',
    duration: '3 месяца',
    role: 'Инженер-технолог',
    bullets: [
      'Чертежи и эскизы с натурного образца, техпроцессы, работа с участком.',
      'Документация по ЕСКД и ГОСТ.',
    ],
  },
  {
    company: 'ООО «Новокондровская ТЭЦ»',
    location: 'Кондрово',
    period: 'Август 2015 — Август 2019',
    duration: '4 года 1 месяц',
    role: 'Инженер по ремонту',
    bullets: [
      'Ремонт и диагностика: турбины, котлы, насосы, арматура, паропроводы.',
      'Дефектовки, ТЗ на ремонт, приёмка по КС-2, исполнительные чертежи и формуляры.',
      'Выезды, замеры, эскизы — работа с железом, не только с файлами.',
    ],
  },
]

const jobsAutomation: ResumeJob[] = [
  {
    company: 'ООО «Техностайл»',
    url: 'https://nordfox.ru/',
    location: 'Москва',
    industry: 'Строительство / навесные фасады',
    period: 'Февраль 2026 — настоящее время',
    duration: '8 месяцев',
    role: 'Ведущий инженер-конструктор · автоматизация выпуска КМД',
    bullets: [
      'Владелец контура «модель → альбом КМ/КМД → спецификация → заказ в цех» для модулей навесного фасада.',
      'Плагин Revit (2021/2022): автосборка листов КМД (модуль, панель, профили), размеры, маркировка, ориентация видов. Замер: 60–90 мин → 10–15 мин.',
      'Десктопные утилиты: менеджер типового проекта в КОМПАС, спецификация по шаблону, раскрой профилей.',
      'Параллельно — проектирование модулей, листовых деталей и рам (основа для корректной автоматизации).',
    ],
    achievements: [
      'На ~108 типах модулей — порядка 90–135 ч экономии относительно ручной сборки листов КМД.',
      'Меньше расхождений между моделью, альбомом и заказом в производство.',
    ],
  },
  {
    company: 'ООО «БЕЙОНД РУС»',
    location: 'Москва',
    industry: 'ЖКХ / вентиляция',
    period: 'Август 2025 — Февраль 2026',
    duration: '7 месяцев',
    role: 'Инженер-конструктор · автоматизация типовых комплектов',
    bullets: [
      'КД листовых изделий в КОМПАС-3D и SolidWorks + автоматизация типовой модели и комплекта чертежей из Excel через API CAD: ~4 ч → ~15 мин.',
      'Приложение 2D-раскроя листа (DXF → раскладка 2500×1250, площадь, стоимость, Excel/PDF).',
      'Сопровождение изделий: допуски, сборка, пилотная партия, правки по цеху.',
    ],
    achievements: [
      'Типовой комплект — один запуск утилиты вместо цепочки ручных операций.',
    ],
  },
  {
    company: 'ООО «ГеоПак»',
    url: 'https://geopack.ru/',
    location: 'Кондрово',
    industry: 'ЦБП / деревообработка',
    period: 'Октябрь 2024 — Август 2025',
    duration: '11 месяцев',
    role: 'Инженер-конструктор · пакет документации в цех',
    bullets: [
      'Add-in / макросы КОМПАС и SolidWorks (Python, VBA, PyQt5, C#): поиск моделей, DXF, развёртки, PDF-альбом. ~150 позиций: 5–10 ч → ~46 мин (6–13×).',
      'Конструкторская база: валы, редукторы, рамы в SolidWorks / AutoCAD; КМ/КМД; реверс после 3D-скана.',
      'Контракт с производством: что уходит в цех как готовый пакет файлов.',
    ],
    achievements: [
      'SolidWorks «пакет в цех» на пилоте 150 позиций.',
    ],
    achievementsCta: {
      label: 'Примеры работ (Google Drive)',
      href: DRIVE_ALL,
    },
  },
  {
    company: 'ПАО «КАДВИ»',
    location: 'Калуга',
    period: 'Ноябрь 2022 — Январь 2023',
    duration: '3 месяца',
    role: 'Инженер-технолог',
    bullets: [
      'Чертежи с натуры, техпроцессы, ЕСКД — понимание цехового контура.',
    ],
  },
  {
    company: 'ООО «Новокондровская ТЭЦ»',
    location: 'Кондрово',
    period: 'Август 2015 — Август 2019',
    duration: '4 года 1 месяц',
    role: 'Инженер по ремонту',
    bullets: [
      'Железо и документация ремонта: дефектовки, ТЗ, исполнительные чертежи.',
    ],
  },
]

export const resumeProfiles: Record<ResumeMode, ResumeProfile> = {
  constructor: {
    id: 'constructor',
    ...shared,
    workFormat: 'Удалённо / гибрид · полная или проектная занятость · ГПХ и ТК',
    desiredRole: 'Инженер-конструктор / Ведущий инженер-конструктор',
    specializations: [
      'Инженер-конструктор',
      'КД по ЕСКД',
      'КОМПАС-3D',
      'SolidWorks',
      'AutoCAD',
      'Листовой металл',
      'КМ / КМД',
      'Реверс-инжиниринг',
      'Допуски и посадки',
    ],
    highlights: [
      { value: '6+ лет', label: 'конструкторская практика' },
      { value: 'КОМПАС · SW · AutoCAD', label: 'ежедневные CAD' },
      { value: 'ЕСКД', label: 'полный комплект КД' },
      { value: 'Цех', label: 'согласование и сопровождение' },
    ],
    about:
      'Инженер-конструктор: 3D-модели, рабочие чертежи и спецификации по ЕСКД. Уверенно работаю в КОМПАС-3D, SolidWorks и AutoCAD — листовой металл, рамы и узлы, валы и редукторы, альбомы КМ/КМД. Есть реверс по образцу и правка моделей после 3D-сканирования. Сопровождаю изделия до производства: замечания цеха, пилот, серия.',
    sideNote:
      'Дополнительно умею автоматизировать типовой выпуск КД (плагины КОМПАС / SolidWorks / Revit) — подключаю по запросу, это не замена конструкторской работы.',
    jobs: jobsConstructor,
    skills: [
      'КОМПАС-3D',
      'SolidWorks',
      'AutoCAD',
      'Plant 3D',
      'Revit',
      'ЕСКД',
      'Допуски и посадки',
      'Листовой металл',
      'КМ / КМД',
      'Реверс-инжиниринг',
      '3D-сканирование',
      'Спецификации',
      'Excel',
    ],
    cadSkills: cadSkillsConstructor,
    links: [
      { label: 'Портфолио (сайт)', href: 'https://vorobjev.pro/' },
      { label: 'Резюме · конструктор', href: 'https://vorobjev.pro/resume?mode=constructor' },
      { label: 'Примеры КД (Google Drive)', href: DRIVE_ALL },
      { label: 'Кейсы КОМПАС-3D', href: 'https://vorobjev.pro/kompas' },
      { label: 'Кейсы SolidWorks', href: 'https://vorobjev.pro/solidworks' },
      { label: 'Чертежи AutoCAD (Drive)', href: 'https://drive.google.com/drive/folders/1_j-SSbfP4sAnqr4GJjZpeH9_I-F1dMBY?hl=ru' },
      { label: 'Листовой металл (Drive)', href: 'https://drive.google.com/drive/folders/1yXbK8TbtuUlDRFJaUhckzrAIA_363ehW?hl=ru' },
      { label: 'Telegram', href: 'https://t.me/Alexandr_Vorobjev' },
    ],
  },
  automation: {
    id: 'automation',
    ...shared,
    workFormat: 'Удалённо · проект / ГПХ / пилот · полная занятость по договорённости',
    desiredRole: 'Автоматизация полного цикла производства · плагины CAD / BIM',
    specializations: [
      'Автоматизация CAD',
      'Пакет в цех (DXF / PDF)',
      'КОМПАС COM',
      'SolidWorks API',
      'Revit API',
      'C# / .NET',
      'Python',
      'КД по ЕСКД (база)',
      'Human-in-the-loop',
    ],
    highlights: [
      { value: '60–90 → 10–15 мин', label: 'комплект КМД (Revit)' },
      { value: '~4 ч → ~15 мин', label: 'типовой комплект (КОМПАС)' },
      { value: '6–13×', label: 'пакет в цех (SolidWorks)' },
      { value: '6+ лет', label: 'КД + понимание цеха' },
    ],
    about:
      'Строю контур от модели и КД до пакета файлов в цех: плагины и утилиты для КОМПАС-3D, SolidWorks и Revit. База — чтение чертежа по ЕСКД и опыт конструктора; поверх — правила, пакетная выгрузка DXF/развёрток/PDF и ускорение типовых операций. Замеры на реальных пакетах: КМД в Revit 60–90→15 мин; типовой комплект КОМПАС ~4 ч→~15 мин; SolidWorks пакет в цех на ~150 позиций ~46 мин вместо 5–10 ч.',
    jobs: jobsAutomation,
    skills: [
      'КОМПАС-3D',
      'SolidWorks',
      'AutoCAD',
      'Revit',
      'ЕСКД',
      'КОМПАС COM',
      'SolidWorks API',
      'Revit API',
      'C# / .NET',
      'WPF',
      'Python',
      'PyQt5',
      'VBA',
      'DXF / PDF в цех',
      'Excel',
      'Vue',
    ],
    cadSkills: cadSkillsAutomation,
    links: [
      { label: 'Портфолио (сайт)', href: 'https://vorobjev.pro/' },
      { label: 'Резюме · автоматизация', href: 'https://vorobjev.pro/resume?mode=automation' },
      { label: 'Кейсы КОМПАС', href: 'https://vorobjev.pro/kompas' },
      { label: 'Кейсы SolidWorks', href: 'https://vorobjev.pro/solidworks' },
      { label: 'Кейсы Revit', href: 'https://vorobjev.pro/revit' },
      { label: 'Примеры КД (Drive)', href: DRIVE_ALL },
      { label: 'DeskReview (3D в браузере)', href: 'https://alexpror.github.io/3d_viewer_1.0/' },
      { label: 'GitHub', href: 'https://github.com/AlexPror' },
      { label: 'Telegram', href: 'https://t.me/Alexandr_Vorobjev' },
    ],
  },
}

/** Совместимость со старым импортом — профиль автоматизации */
export const resume = resumeProfiles.automation

export function resolveResumeMode(raw: string | null | undefined): ResumeMode {
  if (raw === 'constructor' || raw === 'automation') return raw
  return 'constructor'
}
