/**
 * Yandex Metrika counter init options.
 * @see https://yandex.ru/support/metrica/objects/parameters.html
 */
export interface YandexMetrikaInitParams {
  /** Server-side rendering mode */
  ssr?: boolean;
  /** Webvisor (session replay) */
  webvisor?: boolean;
  /** Click map */
  clickmap?: boolean;
  /** E-commerce dataLayer name */
  ecommerce?: string | false;
  /** Accurate track bounce */
  accurateTrackBounce?: boolean;
  /** Track outbound links */
  trackLinks?: boolean;
  /** Track hash (SPA) */
  trackHash?: boolean;
  /** Trigger delayed init (e.g. after consent) */
  defer?: boolean;
  /** Custom params */
  params?: Record<string, string | number | boolean>;
}

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: string,
      params?: YandexMetrikaInitParams | Record<string, unknown>
    ) => void;
  }
}

export {};
