# Portfolio site

Лендинг: разработка ПО для CAD, BIM и производства.

**Сайт:** https://alexpror.github.io/portfolio_site/

## Запуск

```bat
run.bat
```

http://localhost:5180

## Настройка `.env`

Скопируйте `.env.example` → `.env` (файл в `.gitignore`):

| Переменная | Зачем |
|------------|--------|
| `VITE_TELEGRAM_URL` | Telegram (уже есть default в коде) |
| `VITE_DESKREVIEW_URL` | Ссылка на DeskReview (по умолчанию [демо на Pages](https://alexpror.github.io/3d_viewer_1.0/)) |
| `VITE_WEB3FORMS_KEY` | Форма → почта ([web3forms.com](https://web3forms.com), включите captcha в кабинете) |

Без Web3Forms используется FormSubmit — подтвердите активацию письма с почты.

## GitHub Pages

После пуша в `main` Actions собирает сайт и деплоит на Pages.

Один раз: **Settings → Pages → Source: GitHub Actions**.

`base` в Vite: `/portfolio_site/` (имя репозитория). При смене имени репо обновите `vite.config.ts`, `robots.txt`, `sitemap.xml` и `index.html`.

## Сборка

```bat
build.bat
```

Клиентские логи на сервер — только в `npm run dev` / preview, не в production.

## Стек

Vue 3 · Vite · TypeScript · Vue Router
