# Portfolio site

Лендинг: разработка ПО для CAD, BIM и производства + резюме конструктора.

[![CAD · BIM · Production](./public/og.jpg)](https://vorobjev.pro/)

**Сайт:** https://vorobjev.pro/  
**Репозиторий:** https://github.com/AlexPror/portfolio_site  
**Релиз:** [v1.0.0](https://github.com/AlexPror/portfolio_site/releases/tag/v1.0.0)

## Страницы

| Путь | Содержание |
|------|------------|
| `/` | Главная: выбор платформы, как работаем, DeskReview, заявка |
| `/kompas` | Кейсы и форма по КОМПАС-3D |
| `/revit` | Кейсы Revit (листы КМД) и форма |
| `/solidworks` | Кейсы SolidWorks (пакет в цех) и форма |
| `/resume` | Резюме (опыт, навыки, примеры), печать / PDF |

Старый `/app` → редирект на `/#deskreview`.

На страницах платформ кейс раскрывается на всю ширину: блоки «Проблема → Подход → Ограничения → Результат» в одну строку (на широком экране). Тексты резюме и кейсов — в `src/data/resume.ts` и `src/data/platforms.ts`.

## Запуск

```bat
run.bat
```

Dev-сервер: **http://localhost:5180/** (`base: '/'`).

Сборка:

```bat
build.bat
```

Превью production: `npm run preview` → http://localhost:4180/

## Настройка `.env`

Скопируйте `.env.example` → `.env` (в `.gitignore`) для локальной разработки:

| Переменная | Зачем |
|------------|--------|
| `VITE_TELEGRAM_URL` | Telegram (есть default в коде) |
| `VITE_DESKREVIEW_URL` | Ссылка на DeskReview (по умолчанию [демо](https://alexpror.github.io/3d_viewer_1.0/)) |
| `VITE_WEB3FORMS_KEY` | Форма → почта ([web3forms.com](https://web3forms.com)) |

Без Web3Forms — FormSubmit (нужно подтвердить письмо *Activate* с почты; на GitHub Pages часто не доходит).

### Форма на GitHub Pages

Pages — статика, почту шлёт только внешний сервис. Чтобы заявки шли через Web3Forms:

1. Ключ на [web3forms.com](https://web3forms.com) (email = куда приходят заявки).
2. В репо: **Settings → Secrets and variables → Actions** → New repository secret:
   - имя: `VITE_WEB3FORMS_KEY`
   - значение: access key из кабинета Web3Forms
3. Пуш в `main` или **Actions → Deploy to GitHub Pages → Run workflow** — ключ подставится на `npm run build`.

Опционально те же Secrets: `VITE_TELEGRAM_URL`, `VITE_DESKREVIEW_URL`.

## Домен и GitHub Pages

Продакшен: **https://vorobjev.pro** (custom domain → GitHub Pages).

Пуш в `main` → Actions собирает и деплоит. Файл `public/CNAME` = `vorobjev.pro`.

Один раз в GitHub: **Settings → Pages → Custom domain** = `vorobjev.pro`, затем **Enforce HTTPS**.

### DNS у REG.RU (зона vorobjev.pro)

| Тип | Хост | Значение |
|-----|------|----------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `alexpror.github.io` |

Удали A/CNAME на хостинг REG.RU, если мешают. Распространение DNS: минуты–сутки.

`base` в Vite: `/`. При смене домена обновите `vite.config.ts`, `public/CNAME`, `robots.txt`, `sitemap.xml`, `index.html`, `src/router/index.ts`.

## SEO

- OG / Twitter / JSON-LD в `index.html`
- `public/og.jpg`, `.github/social-preview.jpg`
- `robots.txt` + `sitemap.xml` (главная, платформы, резюме)
- Title/description по маршрутам

## Стек

Vue 3 · Vite · TypeScript · Vue Router
