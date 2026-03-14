# yandex-metrika-nextjs

React-компонент для подключения счётчика [Яндекс.Метрики](https://metrika.yandex.ru). Подгрузка скрипта и инициализация с опциональной отложенной инициализацией (например, после согласия на cookies).

## Установка

```bash
npm install yandex-metrika-nextjs
# или
pnpm add yandex-metrika-nextjs
# или
yarn add yandex-metrika-nextjs
```

## Использование

### Базовое

Вставьте компонент в приложение (например, в `layout` или корневой компонент) и передайте ID счётчика:

```tsx
import { YandexMetrika } from "yandex-metrika-nextjs";

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <YandexMetrika counterId={12345678} />
      </body>
    </html>
  );
}
```

### С согласием на cookies (GDPR-сценарий)

Инициализировать счётчик только после согласия пользователя:

```tsx
import { YandexMetrika } from "yandex-metrika-nextjs";

function App() {
  const [hasConsent, setHasConsent] = useState(false);

  return (
    <>
      <YandexMetrika counterId={12345678} shouldInit={hasConsent} />
      {!hasConsent && <CookieBanner onAccept={() => setHasConsent(true)} />}
    </>
  );
}
```

### Свои параметры инициализации

```tsx
<YandexMetrika
  counterId={12345678}
  initParams={{
    webvisor: true,
    clickmap: true,
    trackLinks: true,
    ecommerce: "dataLayer",
    trackHash: true,
  }}
/>
```

## API

| Проп         | Тип                       | По умолчанию | Описание                                              |
| ------------ | ------------------------- | ------------ | ----------------------------------------------------- |
| `counterId`  | `number`                  | —            | ID счётчика из интерфейса Метрики                     |
| `shouldInit` | `boolean`                 | `true`       | Выполнять ли инициализацию (например, после согласия) |
| `initParams` | `YandexMetrikaInitParams` | см. ниже     | Параметры инициализации счётчика                      |

Параметры по умолчанию: `ssr: true`, `webvisor: true`, `clickmap: true`, `ecommerce: "dataLayer"`, `accurateTrackBounce: true`, `trackLinks: true`. Их можно переопределить через `initParams`.

## Требования

- React 18+
- Подходит для Next.js (App Router и Pages Router) и любого React-приложения

## Licence

[MIT licence](https://opensource.org/licenses/MIT)
