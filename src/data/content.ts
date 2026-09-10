export interface KpiItem {
  value: string
  label: string
  note?: string
}

export interface ProjectCard {
  id: string
  platform: string
  title: string
  description: string
  bullets: string[]
  caseStudy: {
    problem: string
    approach: string
    constraints: string
    result: string
  }
  tags: string[]
}

export interface ServiceItem {
  title: string
  description: string
}

export interface AudienceItem {
  title: string
  outcome: string
}

export interface WorkStep {
  title: string
  description: string
}

export const site = {
  name: 'CAD · BIM · Production',
  tagline: 'Разработка ПО для CAD, BIM и производства',
  subtitle:
    'Плагины и автоматизация для Revit, КОМПАС-3D и SolidWorks: спецификации, выпуск чертежей, подготовка к производству.',
  author: 'Александр Воробьёв',
  location: 'Россия · удалённо',
  experience: 'Промышленная автоматизация CAD/BIM',
  contact: {
    email: 'vorobjev.alexandr-2017@yandex.ru',
    telegram: import.meta.env.VITE_TELEGRAM_URL || 'https://t.me/Alexandr_Vorobjev',
  },
  deskReviewUrl:
    (import.meta.env.VITE_DESKREVIEW_URL || '').trim() ||
    'https://alexpror.github.io/3d_viewer_1.0/',
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY ?? '',
}

export const audiences: AudienceItem[] = [
  {
    title: 'Строительство (Revit / AutoCAD)',
    outcome: 'Виды на лист, цепи размеров, автоматизация под ваш альбом и семейства',
  },
  {
    title: 'BIM-команды и проектные бюро',
    outcome: 'Revit: комплекты видов модуля, шаблоны, именование под стандарт офиса',
  },
  {
    title: 'Машиностроение (КОМПАС-3D / SolidWorks)',
    outcome: 'Спецификации под ваш шаблон, а не под ГОСТы, разработка инструментов под требования команды конструкторов',
  },
  {
    title: 'Металлоконструкции и производство',
    outcome: 'DXF (раскрой для листового металла), раскрой для профилей, подготовка данных для цеха и снабжения',
  },
]

/** Проверяемые факты вместо абстрактных KPI */
export const heroFacts: KpiItem[] = [
  {
    value: 'Revit / AutoCAD',
    label: 'плагины',
    note: 'Revit API · C# / .NET · WPF',
  },
  { value: '2–6 нед.', label: 'прототип по ТЗ', note: 'ориентир' },
  {
    value: 'КОМПАС / SolidWorks',
    label: 'API, десктоп и веб',
    note: 'SolidWorks API · JS / TS · Three.js / WebGL',
  },
]

export const projects: ProjectCard[] = [
  {
    id: 'revit',
    platform: 'Revit',
    title: 'Add-in: листы КМД модуля, панели и профилей',
    description:
      'Комплекты чертежей НВФ: рама / панель / профили, плоский и угловой модуль. Шаблоны, автомасштаб, ориентация. Revit 2021 и 2022.',
    bullets: [
      'Сценарии: модуль, панель, профили (плоский); модуль и панель (угловой)',
      'Виды спереди / разрезы / изометрия по эталонной раскладке',
      'Ядро отделено от бренда заказчика (Core + Pack)',
    ],
    caseStudy: {
      problem:
        'Ручная сборка листов КМД по модулям фасада занимала часы и давала разный результат у исполнителей.',
      approach:
        'Add-in «Листы КМД»: выбор формы и типа → комплект видов по эталонам, скрытие соседей, replace по kind.',
      constraints:
        'Две версии Revit, разные семейства, плоский и L-угол, жёсткие эталоны приёмки.',
      result:
        'Комплект: 60–90 мин вручную → 10–15 мин с плагином; на ~108 типах — порядка 90–135 ч экономии.',
    },
    tags: ['Revit API', 'C#', '.NET', 'КМД', '2021 / 2022'],
  },
  {
    id: 'kmd',
    platform: 'КОМПАС-3D',
    title: 'Полный цикл документации КМ / КМД',
    description:
      'Спецификация → комплект чертежей → PDF → сводная спецификация → раскрой профиля и листа. Металлоконструкции.',
    bullets: [
      'Спецификация под шаблон компании, Excel, FRW',
      'Штампы, перечень, пакетный PDF/DWG/DXF',
      'Пакетные утилиты: версии файлов, штампы',
    ],
    caseStudy: {
      problem:
        'КМ/КМД выпускались длинной цепочкой ручных операций: спецификация, альбом, выгрузки и проверка комплектности.',
      approach:
        'Собрал конвейер по шагам: генерация документов под шаблон компании, пакетный экспорт и сервисные утилиты по штампам/версиям.',
      constraints:
        'Разные требования к формам документов и высокий риск человеческих ошибок на пакетной обработке.',
      result:
        'Сквозной выпуск документации стал предсказуемым: меньше ручных действий и меньше расхождений между комплектами.',
    },
    tags: ['Python', 'COM API', 'KOMPAS'],
  },
  {
    id: 'kompas-projects',
    platform: 'КОМПАС-3D',
    title: 'Менеджер типовых проектов',
    description:
      'Новый заказ из шаблона: копирование сборки, габариты, обозначения, штампы, PDF и DXF развёрток.',
    bullets: [
      'Полный цикл в один запуск',
      'Каскад переменных по шаблону',
      'Пакетный PDF чертежей и DXF развёрток',
    ],
    caseStudy: {
      problem:
        'При каждом новом заказе инженер повторял одни и те же действия по копированию проекта, заполнению штампов и выгрузке файлов.',
      approach:
        'Разработал менеджер типовых проектов: новый заказ создаётся из шаблона с автоматической подстановкой параметров и пакетными выгрузками.',
      constraints:
        'Шаблоны должны оставаться управляемыми, а логика подстановки — стабильной при изменении исходных сборок.',
      result:
        'Запуск типового заказа ускорился: меньше рутинных кликов и ниже вероятность пропустить обязательные этапы.',
    },
    tags: ['Python', 'COM API', 'KOMPAS'],
  },
  {
    id: 'solidworks',
    platform: 'SolidWorks',
    title: 'Add-in: пакет документации в цех',
    description:
      'Из Excel-перечня: DXF для лазера, чертежи развёрток, PDF-альбом. Core + Client Pack под регламент производства.',
    bullets: [
      'Этапы: Full / DXF / DXF+чертежи / PDF',
      'Выход в сетевую папку заявки по толщине и материалу',
      'Параметризация и пакетный экспорт STEP/DXF',
    ],
    caseStudy: {
      problem:
        'Подготовка DXF и PDF для лазера по перечню вручную занимала много времени и давала расхождения имён.',
      approach:
        'SolidWorks add-in: Excel → экспорт DXF/развёрток/PDF в структуру папок цеха.',
      constraints:
        'Совместимость со версиями SW у заказчика, сетевые пути, пилот без записи в PDM.',
      result:
        'Один запуск вместо 5–10 ч ручной сборки; на 150 позиций — ориентир ~46 мин (6–13× быстрее).',
    },
    tags: ['SolidWorks API', 'C#', '.NET', 'DXF'],
  },
  {
    id: 'dxf-prep',
    platform: 'Листовой металл',
    title: 'Коррекция разверток DXF перед раскроем',
    description:
      'Подгонка длины развертки до эталона, когда CAD даёт погрешность на криволинейных деталях.',
    bullets: [
      'Растяжение по основанию с опорными дугами',
      'Внешний радиус из внутреннего',
      'Пакетная обработка папки разверток',
    ],
    caseStudy: {
      problem:
        'Развёртки DXF для криволинейных деталей давали отклонения по длине, что влияло на точность раскроя.',
      approach:
        'Собрал утилиту коррекции разверток с перерасчётом и пакетной обработкой файлов для производственной подготовки.',
      constraints:
        'Нужно было сохранить геометрию и обеспечить повторяемость результата на разных партиях файлов.',
      result:
        'Снижен объём ручной доводки перед раскроем и повышена точность подготовки DXF.',
    },
    tags: ['Python', 'ezdxf', 'DXF'],
  },
  {
    id: 'nesting',
    platform: 'Web',
    title: 'Раскрой листового металла',
    description: 'DXF → оптимизация с поворотом → визуализация и Excel/PDF для цеха.',
    bullets: ['Проверка пересечений', 'Отчёт для снабжения', 'Vue + Python'],
    caseStudy: {
      problem:
        'Раскладка деталей на лист часто делалась вручную, что занимало время и давало нестабильный расход материала.',
      approach:
        'Сделал веб-инструмент раскроя: загрузка DXF, оптимизация размещения с поворотом и автоматический выпуск отчётов.',
      constraints:
        'Важны контроль пересечений, прозрачность расчёта и удобство использования без установки CAD на рабочем месте.',
      result:
        'Подготовка раскроя ускорилась; отдел получает визуализацию и документы для цеха и снабжения в одном процессе.',
    },
    tags: ['Vue', 'Flask', 'DXF'],
  },
]

export const workSteps: WorkStep[] = [
  {
    title: '1. Разбор задачи',
    description:
      'Созвон или переписка: процесс, форматы, срок. Бесплатно. Конфиденциальность — по запросу.',
  },
  {
    title: '2. Прототип',
    description: 'Ключевой сценарий в вашей среде CAD. Обычно 2–6 недель — зависит от объёма.',
  },
  {
    title: '3. Внедрение',
    description: 'Доработка, установка, инструкция. Исходники и сопровождение — по договорённости.',
  },
]

export const servicesIntro =
  'Заказная разработка под ваш регламент. DeskReview — отдельный продукт-демо; основной фокус — плагины и автоматизация CAD.'

export const services: ServiceItem[] = [
  {
    title: 'Плагины для Autodesk Revit',
    description:
      'Виды модуля на лист A4…A0, шаблоны, ориентация, цепи размеров по вашим семействам. Сборка под нужные версии Revit; ядро отделено от бренда заказчика.',
  },
  {
    title: 'Автоматизация КОМПАС-3D',
    description:
      'Спецификация, штампы, альбом чертежей, пакетный PDF/DWG/DXF, типовые проекты из шаблона.',
  },
  {
    title: 'Плагины и макросы SolidWorks',
    description:
      'Параметризация сборок, пакетные операции, экспорт в производство. Add-in на SolidWorks API.',
  },
  {
    title: 'Раскрой и документооборот',
    description:
      'Раскрой из DXF/спецификации, подготовка развёрток, Excel/PDF, связка отделов.',
  },
]

export interface PriceItem {
  label: string
  value: string
  note?: string
}

export interface PriceTab {
  id: string
  label: string
  items: PriceItem[]
}

export const pricingTabs: PriceTab[] = [
  {
    id: 'revit',
    label: 'Revit',
    items: [
      {
        label: 'Прототип add-in',
        value: 'от 80 000 ₽',
        note: 'Одна ключевая команда: виды модуля → лист или цепь размеров',
      },
      {
        label: 'Рабочий add-in под альбом',
        value: 'от 150 000 ₽',
        note: 'Листы A4…A0, шаблоны, именование, ориентация; dual-build под версии Revit',
      },
      {
        label: 'Доработка / новая команда',
        value: 'от 40 000 ₽',
        note: 'К уже существующему add-in',
      },
    ],
  },
  {
    id: 'kompas',
    label: 'КОМПАС-3D',
    items: [
      {
        label: 'Спецификация под ваш шаблон',
        value: 'от 100 000 ₽',
        note: 'Массы, разделы, итоги, связь с чертежом',
      },
      {
        label: 'Конвейер документации',
        value: 'от 180 000 ₽',
        note: 'Альбом, штампы, экспорт, спецификация',
      },
      {
        label: 'Утилита / скрипт под задачу',
        value: 'от 50 000 ₽',
        note: 'Версии файлов, штампы, пакетные операции',
      },
    ],
  },
  {
    id: 'solidworks',
    label: 'SolidWorks',
    items: [
      {
        label: 'Параметризация сборки',
        value: 'от 70 000 ₽',
        note: 'Конфигурации, пакетные операции',
      },
      {
        label: 'Add-in под процесс предприятия',
        value: 'от 140 000 ₽',
        note: 'SolidWorks API, C# / .NET',
      },
      {
        label: 'Доработка макроса / add-in',
        value: 'от 35 000 ₽',
        note: 'Расширение уже написанного',
      },
    ],
  },
]

export const pricingNote =
  'Цены ориентировочные. Точная смета — после разбора задачи. Исходники и сопровождение — по договорённости.'

export const techStack = [
  'Revit API',
  'SolidWorks API',
  'КОМПАС COM',
  'C# / .NET',
  'WPF',
  'Python',
  'JavaScript / TypeScript',
  'Vue',
  'Three.js / WebGL',
  'STEP / WASM',
  'PDF',
  'Excel / FRW',
]

export const platformOptions = [
  { value: '', label: 'Не выбрано' },
  { value: 'revit', label: 'Revit' },
  { value: 'kompas', label: 'КОМПАС-3D' },
  { value: 'solidworks', label: 'SolidWorks' },
  { value: 'web', label: 'Web / раскрой / вьювер' },
  { value: 'other', label: 'Другое' },
]
