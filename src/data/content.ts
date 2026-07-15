export interface KpiItem {
  value: string
  label: string
}

export interface ProjectCard {
  id: string
  platform: string
  title: string
  description: string
  bullets: string[]
  tags: string[]
}

export interface ServiceItem {
  title: string
  description: string
}

export interface AudienceItem {
  title: string
}

export const site = {
  name: 'CAD · BIM · Production',
  tagline: 'Разработка ПО для CAD, BIM и производства',
  subtitle:
    'Плагины для Revit, КОМПАС-3D и SolidWorks. Спецификации, выпуск чертежей, 3D вьювер. Названия заказчиков не публикуются.',
  contact: {
    email: 'vorobjev.alexandr-2017@yandex.ru',
    /** Ссылка Telegram; переопределяется VITE_TELEGRAM_URL */
    telegram: import.meta.env.VITE_TELEGRAM_URL || 'https://t.me/Alexandr_Vorobjev',
  },
  deskReviewUrl: import.meta.env.VITE_DESKREVIEW_URL ?? '',
  /** Formspree / Web3Forms — приоритетнее FormSubmit. Пример: ключ Web3Forms */
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY ?? '',
}

export const audiences: AudienceItem[] = [
  { title: 'Конструкторские отделы' },
  { title: 'BIM и 3D-проектирование' },
  { title: 'Производство и снабжение' },
  { title: 'Согласование без CAD' },
  { title: 'Заказная автоматизация' },
]

export const kpis: KpiItem[] = [
  { value: '~2×', label: 'быстрее выпуск документации' },
  { value: '~95%', label: 'КПД раскроя профилей' },
  { value: 'Revit · КОМПАС · SW', label: 'CAD / BIM / 3D' },
]

export const projects: ProjectCard[] = [
  {
    id: 'revit',
    platform: 'Revit',
    title: 'Add-in: виды на лист и цепочки размеров',
    description:
      'Пакет видов и листов (A4…A0), шаблоны, автомасштаб, ориентация. Цепочка размеров по секущей на виде. Revit 2021/2022.',
    bullets: [
      'Выбор элементов → листы 2×2 под шаблоны',
      'Ориентация проекций и формат листа',
      'Цепочка размеров: две точки → грани',
    ],
    tags: ['Revit API', 'C#', '.NET'],
  },
  {
    id: 'kmd',
    platform: 'КОМПАС-3D',
    title: 'Полный цикл документации КМ / КМД',
    description:
      'Спецификация → комплект чертежей (фильтры, нумерация в альбоме) → PDF → сводная спецификация → раскрой профиля и листа.',
    bullets: [
      'Спецификация под шаблон компании, Excel, FRW',
      'Штампы, перечень, пакетный PDF/DWG/DXF',
      'Пакетные утилиты: версии файлов, штампы',
    ],
    tags: ['Python', 'COM API', 'KOMPAS'],
  },
  {
    id: 'kompas-projects',
    platform: 'КОМПАС-3D',
    title: 'Менеджер типовых проектов',
    description:
      'Новый заказ из шаблона: копирование сборки, параметры габаритов, обозначения, штампы, PDF и DXF развёрток.',
    bullets: [
      'Полный цикл в один запуск',
      'Каскад переменных по шаблону',
      'Пакетный PDF чертежей и DXF развёрток',
    ],
    tags: ['Python', 'COM API', 'KOMPAS'],
  },
  {
    id: 'solidworks',
    platform: 'SolidWorks',
    title: 'Параметризация и обмен геометрии',
    description:
      'Параметрические сборки, подготовка геометрии для downstream. Add-in на SolidWorks API — по ТЗ.',
    bullets: [
      'Конфигурации и пакетные операции',
      'Экспорт в цепочку CAD → производство',
    ],
    tags: ['SolidWorks API', 'C#', '.NET'],
  },
  {
    id: 'dxf-prep',
    platform: 'Листовой металл',
    title: 'Коррекция разверток DXF перед раскроем',
    description:
      'Подгонка длины развертки до эталона, когда CAD даёт погрешность на криволинейных деталях. Дуги и отверстия сохраняются.',
    bullets: [
      'Растяжение по основанию с опорными дугами',
      'Внешний радиус из внутреннего (толщина, гиб)',
      'Пакетная обработка папки разверток',
    ],
    tags: ['Python', 'ezdxf', 'DXF'],
  },
  {
    id: 'nesting',
    platform: 'Web',
    title: 'Раскрой листового металла',
    description: 'DXF → оптимизация с поворотом → визуализация и Excel/PDF.',
    bullets: ['Проверка пересечений', 'Vue + Python'],
    tags: ['Vue', 'Flask', 'DXF'],
  },
]

export const pipelineSteps = [
  '2D / BIM',
  '3D / CAD',
  'Спецификация',
  'Комплект',
  'PDF',
  'Производство',
]

export const servicesIntro =
  'Плагины и программы под ваш процесс выпуска чертежей и спецификаций. Если типового сценария нет — инструмент под нужды производства.'

export const services: ServiceItem[] = [
  {
    title: 'Плагины для Autodesk Revit',
    description:
      'Виды и листы A4…A0, шаблоны, ориентация проекций, цепочки размеров на виде. Под ваши семейства и альбом (C# / Revit API).',
  },
  {
    title: 'Автоматизация КОМПАС-3D',
    description:
      'Спецификация под любой шаблон (массы, количества, разделы, итоги, связь с чертежом). Штампы, перечень, пакетный PDF/DWG/DXF (Python / COM).',
  },
  {
    title: 'Плагины и макросы SolidWorks',
    description:
      'Параметризация сборок, пакетные операции, add-in на SolidWorks API (C# / .NET).',
  },
  {
    title: '3D вьювер в браузере',
    description:
      'Модель и PDF без установки CAD: замечания, измерения, отчёт для согласования.',
  },
  {
    title: 'Раскрой и документооборот',
    description:
      'Раскрой из DXF/спецификации, Excel/PDF, связка отделов. Заказной плагин под ваши правила.',
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
        note: 'Одна ключевая команда: виды → листы или цепочка размеров',
      },
      {
        label: 'Рабочий add-in под альбом',
        value: 'от 150 000 ₽',
        note: 'Листы A4…A0, шаблоны, именование, ориентация; размеры — по ТЗ',
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
        note: 'Массы, количества, разделы, итоговые значения по разделам, связь с чертежом',
      },
      {
        label: 'Конвейер документации',
        value: 'от 180 000 ₽',
        note: 'Пакетное обновление штампов, создание альбома чертежей (для строителей), пакетный экспорт PDF/DWG/DXF + работа со спецификацией (объединение, настройка фильтров, передача в другие отделы)',
      },
      {
        label: 'Утилита / скрипт под задачу',
        value: 'от 50 000 ₽',
        note: 'Например пакетное сохранение версий, штампы',
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
        note: 'SolidWorks API, C# / .NET, установка',
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
  'Цены ориентировочные. Точная смета — на бесплатной консультации. Исходники и сопровождение — по договорённости.'

export const techStack = [
  'Revit API',
  'SolidWorks API',
  'КОМПАС COM',
  'C# / .NET',
  'Python',
  'Vue',
  'Three.js',
  'STEP / WASM',
  'PDF',
  'Excel / FRW',
]
