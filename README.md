# Portfolio site

Лендинг: разработка ПО для CAD, BIM и производства.

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
| `VITE_DESKREVIEW_URL` | Ссылка на полный вьювер на `/app` |
| `VITE_WEB3FORMS_KEY` | Форма → почта ([web3forms.com](https://web3forms.com), включите captcha в кабинете) |

Без Web3Forms используется FormSubmit — подтвердите активацию письма с почты.

## Перед деплоем

1. В `public/robots.txt` и `public/sitemap.xml` замените `YOUR_DOMAIN` на ваш домен.
2. На хостинге желательны заголовки: HTTPS, `Referrer-Policy`, CSP по возможности.
3. Клиентские логи на сервер пишутся **только в `npm run dev` / preview**, не в production-сборке.

## Сборка

```bat
build.bat
```

## Стек

Vue 3 · Vite · TypeScript · Vue Router
