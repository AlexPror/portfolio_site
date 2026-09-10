import type { ProjectCard } from './content'

export type PlatformId = 'kompas' | 'revit' | 'solidworks'

export interface PlatformStat {
  value: string
  label: string
  note?: string
}

export interface PlatformPage {
  id: PlatformId
  slug: string
  navLabel: string
  brand: string
  title: string
  subtitle: string
  heroLead: string
  accent: string
  accentDim: string
  accentGlow: string
  themeClass: string
  formPlatform: string
  cases: ProjectCard[]
  offers: { title: string; description: string; from?: string }[]
  stacks: string[]
  stats: PlatformStat[]
  flow: string[]
  compare?: { before: string; after: string; caption: string }
}

export const platforms: PlatformPage[] = [
  {
    id: 'kompas',
    slug: 'kompas',
    navLabel: 'КОМПАС-3D',
    brand: 'КОМПАС-3D',
    title: 'Автоматизация КОМПАС-3D',
    subtitle: 'Спецификации, КМ/КМД, типовые проекты, подготовка в производство',
    heroLead:
      'Заказная автоматизация под ваш шаблон компании: не «коробка», а инструмент под регламент КБ и цеха.',
    accent: '#3ecf9a',
    accentDim: '#2fa87d',
    accentGlow: 'rgba(62, 207, 154, 0.16)',
    themeClass: 'theme-kompas',
    formPlatform: 'kompas',
    stacks: ['КОМПАС COM', 'Python', 'Excel / FRW', 'PDF / DXF'],
    stats: [
      { value: '~4 ч → ~15 мин', label: 'типовой заказ', note: 'менеджер проектов' },
      { value: '1 запуск', label: 'вместо ручной цепочки' },
      { value: 'под шаблон КБ', label: 'не «голая» СП ГОСТ' },
    ],
    flow: ['Задача КБ', 'Прототип API', 'Пакетный выпуск', 'Внедрение'],
    compare: {
      before: 'Часы на штампы, СП и выгрузки',
      after: 'Минуты на типовой цикл',
      caption: 'Ориентир по замерам на типовых проектах',
    },
    offers: [
      {
        title: 'Спецификация под шаблон',
        description: 'Сбор СП из сборки, Excel/PDF/FRW под формы компании.',
        from: 'от 100 000 ₽',
      },
      {
        title: 'Конвейер документации',
        description: 'Альбом, штампы, пакетный экспорт, сводные отчёты.',
        from: 'от 180 000 ₽',
      },
      {
        title: 'Менеджер типовых проектов',
        description: 'Новый заказ из шаблона: переменные, штампы, PDF/DXF.',
        from: 'от 120 000 ₽',
      },
    ],
    cases: [
      {
        id: 'kmd',
        platform: 'КОМПАС-3D',
        title: 'Полный цикл документации КМ / КМД',
        description:
          'Спецификация → комплект чертежей → PDF → сводная спецификация → раскрой профиля и листа.',
        bullets: [
          'Спецификация под шаблон компании, Excel, FRW',
          'Штампы, перечень, пакетный PDF/DWG/DXF',
          'Пакетные утилиты: версии файлов, штампы',
        ],
        caseStudy: {
          problem:
            'КМ/КМД выпускались длинной цепочкой ручных операций: спецификация, альбом, выгрузки и проверка комплектности.',
          approach:
            'Собрал конвейер: генерация документов под шаблон компании, пакетный экспорт и утилиты по штампам/версиям.',
          constraints:
            'Разные требования к формам и высокий риск ошибок на пакетной обработке.',
          result:
            'Сквозной выпуск стал предсказуемым: меньше ручных действий и расхождений между комплектами.',
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
            'При каждом заказе инженер повторял копирование проекта, заполнение штампов и выгрузку файлов.',
          approach:
            'Менеджер типовых проектов: заказ из шаблона с автоподстановкой параметров и пакетными выгрузками.',
          constraints:
            'Шаблоны должны оставаться управляемыми при изменении исходных сборок.',
          result:
            'Типовой заказ: с ~4 ч ручных операций до ~15 мин при одном запуске менеджера.',
        },
        tags: ['Python', 'COM API', 'KOMPAS'],
      },
      {
        id: 'dxf-prep',
        platform: 'Листовой металл',
        title: 'Коррекция разверток DXF перед раскроем',
        description:
          'Подгонка длины развертки до эталона при погрешности CAD на криволинейных деталях.',
        bullets: [
          'Растяжение по основанию с опорными дугами',
          'Внешний радиус из внутреннего',
          'Пакетная обработка папки разверток',
        ],
        caseStudy: {
          problem:
            'Развёртки DXF давали отклонения по длине и влияли на точность раскроя.',
          approach:
            'Утилита коррекции разверток с перерасчётом и пакетной обработкой.',
          constraints:
            'Сохранить геометрию и повторяемость на разных партиях файлов.',
          result:
            'Меньше ручной доводки перед раскроем, выше точность DXF.',
        },
        tags: ['Python', 'ezdxf', 'DXF'],
      },
    ],
  },
  {
    id: 'revit',
    slug: 'revit',
    navLabel: 'Revit',
    brand: 'Autodesk Revit',
    title: 'Плагины Revit для КМД и альбомов',
    subtitle: 'Листы модуля, панели и профилей: плоский и угловой сценарий',
    heroLead:
      'Add-in под ваш альбом и семейства: комплект видов на лист, ориентация, масштабы. Dual-build под нужные версии Revit.',
    accent: '#6b9fff',
    accentDim: '#4f82e0',
    accentGlow: 'rgba(107, 159, 255, 0.18)',
    themeClass: 'theme-revit',
    formPlatform: 'revit',
    stacks: ['Revit API', 'C# / .NET', '2021 / 2022', 'Core + Pack'],
    stats: [
      { value: '60–90 мин → 10–15 мин', label: 'комплект листов', note: 'замер на типовом модуле' },
      { value: '5–6×', label: 'быстрее вручную' },
      { value: '90–135 ч', label: 'экономия на ~108 типах', note: 'ориентир реального проекта' },
    ],
    flow: ['Модуль', 'Листы КМД', 'Ориентация', 'Альбом'],
    compare: {
      before: '108–162 ч на 108 комплектов',
      after: '18–27 ч с надстройкой',
      caption: 'По замерам презентации RevitViewPlace',
    },
    offers: [
      {
        title: 'Прототип add-in',
        description: 'Одна ключевая команда: виды модуля → лист или цепь размеров.',
        from: 'от 80 000 ₽',
      },
      {
        title: 'Рабочий add-in под альбом',
        description: 'Листы КМД, шаблоны, именование, ориентация; dual-build.',
        from: 'от 150 000 ₽',
      },
      {
        title: 'Доработка / новая команда',
        description: 'Расширение уже существующего add-in.',
        from: 'от 40 000 ₽',
      },
    ],
    cases: [
      {
        id: 'revit-kmd',
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
            'Add-in «Листы КМД»: выбор формы и типа → комплект видов по эталонам В9–В21, скрытие соседей, replace по kind.',
          constraints:
            'Две версии Revit, разные семейства, плоский и L-угол, жёсткие эталоны приёмки.',
          result:
            'Комплект: 60–90 мин вручную → 10–15 мин с плагином; на ~108 типах — порядка 90–135 ч экономии.',
        },
        tags: ['Revit API', 'C#', '.NET', 'КМД', '2021 / 2022'],
      },
    ],
  },
  {
    id: 'solidworks',
    slug: 'solidworks',
    navLabel: 'SolidWorks',
    brand: 'SolidWorks',
    title: 'SolidWorks: пакет в цех и автоматизация',
    subtitle: 'Excel → DXF для лазера, развёртки, PDF-альбом, параметризация',
    heroLead:
      'Add-in и макросы под регламент производства: от перечня деталей до пакета файлов на сетевую папку цеха.',
    accent: '#e07a4a',
    accentDim: '#c46538',
    accentGlow: 'rgba(224, 122, 74, 0.16)',
    themeClass: 'theme-solidworks',
    formPlatform: 'solidworks',
    stacks: ['SolidWorks API', 'C# / .NET', 'DXF', 'PDF'],
    stats: [
      { value: '5–10 ч → 1 запуск', label: 'ручная сборка пакета', note: 'ориентир презентации' },
      { value: '~46 мин', label: 'на 150 позиций', note: 'замер пилота' },
      { value: '6–13×', label: 'быстрее ручной работы' },
    ],
    flow: ['Excel', 'Модели SW', 'DXF / развёртки', 'PDF в «лазер»'],
    compare: {
      before: '5–10 часов ручной сборки на проект',
      after: 'Один запуск надстройки',
      caption: 'По замерам демо-сайта пакета в цех',
    },
    offers: [
      {
        title: 'Параметризация сборки',
        description: 'Конфигурации, пакетные операции в сборке.',
        from: 'от 70 000 ₽',
      },
      {
        title: 'Add-in «пакет в цех»',
        description: 'Excel → DXF / развёртки / PDF-альбом под ваш процесс.',
        from: 'от 140 000 ₽',
      },
      {
        title: 'Доработка макроса / add-in',
        description: 'Расширение уже написанного инструмента.',
        from: 'от 35 000 ₽',
      },
    ],
    cases: [
      {
        id: 'soliddxf',
        platform: 'SolidWorks',
        title: 'Add-in: пакет документации в цех',
        description:
          'Из Excel-перечня: поиск моделей, DXF контуров для лазера, чертежи развёрток, многостраничный PDF-альбом с оглавлением. Архитектура Core + Client Pack.',
        bullets: [
          'Этапы пакета: Full / только DXF / DXF+чертежи / только PDF',
          'Выход в сетевую папку заявки: дата → толщина → материал',
          'Отчёт разработчику: обезличенные логи для поддержки',
        ],
        caseStudy: {
          problem:
            'Подготовка DXF и PDF для лазера вручную по перечню занимала много времени и давала расхождения имён файлов.',
          approach:
            'SolidWorks add-in: Excel → шифр детали → экспорт DXF/развёрток/PDF в структуру папок цеха.',
          constraints:
            'Совместимость со старыми версиями SW у заказчика, сетевые пути, без записи в PDM на пилоте.',
          result:
            'Один запуск вместо 5–10 ч ручной сборки; на 150 позиций — ориентир ~46 мин (6–13× быстрее).',
        },
        tags: ['SolidWorks API', 'C#', '.NET', 'DXF', 'PDF'],
      },
      {
        id: 'solidworks-param',
        platform: 'SolidWorks',
        title: 'Параметризация и обмен геометрии',
        description:
          'Параметрические сборки листового металла и профилей, пакетный экспорт STEP/DXF.',
        bullets: [
          'Конфигурации и пакетные операции',
          'Экспорт в цепочку CAD → производство',
          'Add-in под регламент предприятия',
        ],
        caseStudy: {
          problem:
            'Обмен геометрией между отделами зависел от ручных действий конструктора.',
          approach:
            'Инструменты на SolidWorks API для конфигураций и контролируемого экспорта.',
          constraints:
            'Разные правила оформления и выходные форматы по участкам.',
          result:
            'Стабильнее передача геометрии, меньше ручных исправлений.',
        },
        tags: ['SolidWorks API', 'C#', '.NET'],
      },
    ],
  },
]

export function getPlatform(slug: string): PlatformPage | undefined {
  return platforms.find((p) => p.slug === slug)
}
