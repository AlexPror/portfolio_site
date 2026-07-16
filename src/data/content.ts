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
    title: 'Конструкторские отделы',
    outcome: 'Листы, спецификации и штампы под ваш шаблон',
  },
  {
    title: 'BIM и 3D-проектирование',
    outcome: 'Revit: виды, альбомы, размеры на виде',
  },
  {
    title: 'Производство и снабжение',
    outcome: 'DXF, раскрой, связка с цехом',
  },
  {
    title: 'Согласование без CAD',
    outcome: 'PDF и 3D в браузере — DeskReview',
  },
  {
    title: 'Заказная автоматизация',
    outcome: 'Инструмент под ваш процесс, не коробка',
  },
]

/** Проверяемые факты вместо абстрактных KPI */
export const heroFacts: KpiItem[] = [
  { value: 'Revit 2021–22', label: 'версии add-in' },
  { value: '2–6 нед.', label: 'прототип по ТЗ', note: 'ориентир' },
  { value: 'NDA', label: 'по запросу', note: 'конфиденциально' },
]

export const projects: ProjectCard[] = [
  {
    id: 'revit',
    platform: 'Revit',
    title: 'Add-in: виды на лист и цепочки размеров',
    description:
      'Пакет видов и листов (A4…A0), шаблоны, автомасштаб, ориентация. Цепочка размеров по секущей на виде.',
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
      'Спецификация → комплект чертежей → PDF → сводная спецификация → раскрой профиля и листа. Металлоконструкции.',
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
      'Новый заказ из шаблона: копирование сборки, габариты, обозначения, штампы, PDF и DXF развёрток.',
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
      'Параметрические сборки листового металла и профилей, пакетный экспорт для раскроя и согласования.',
    bullets: [
      'Конфигурации и пакетные операции в сборке',
      'Экспорт STEP/DXF в цепочку CAD → производство',
      'Add-in на SolidWorks API под ваш регламент',
    ],
    tags: ['SolidWorks API', 'C#', '.NET'],
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
    tags: ['Python', 'ezdxf', 'DXF'],
  },
  {
    id: 'nesting',
    platform: 'Web',
    title: 'Раскрой листового металла',
    description: 'DXF → оптимизация с поворотом → визуализация и Excel/PDF для цеха.',
    bullets: ['Проверка пересечений', 'Отчёт для снабжения', 'Vue + Python'],
    tags: ['Vue', 'Flask', 'DXF'],
  },
]

export const workSteps: WorkStep[] = [
  {
    title: '1. Разбор задачи',
    description: 'Созвон или переписка: процесс, форматы, срок. Бесплатно. NDA — по запросу.',
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
      'Виды и листы A4…A0, шаблоны, ориентация проекций, цепочки размеров. Под ваши семейства и альбом.',
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
        note: 'Одна ключевая команда: виды → листы или цепочка размеров',
      },
      {
        label: 'Рабочий add-in под альбом',
        value: 'от 150 000 ₽',
        note: 'Листы A4…A0, шаблоны, именование, ориентация',
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
  'Python',
  'Vue',
  'Three.js',
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
