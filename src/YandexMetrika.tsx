"use client";

import React, { useEffect, useRef } from "react";
import type { YandexMetrikaInitParams } from "./types";

const SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";
const DEFAULT_INIT: YandexMetrikaInitParams = {
  ssr: true,
  webvisor: true,
  clickmap: true,
  ecommerce: "dataLayer",
  accurateTrackBounce: true,
  trackLinks: true,
};

export interface YandexMetrikaProps {
  /** Yandex Metrika counter ID (number from metrika.yandex.ru) */
  counterId: number;
  /** When true, initializes the counter (e.g. after cookie consent). Default: true */
  shouldInit?: boolean;
  /** Custom init params. Merged with defaults. */
  initParams?: YandexMetrikaInitParams;
}

function loadScript(counterId: number): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const existing = document.querySelector(
    `script[src*="mc.yandex.ru/metrika/tag.js"]`
  );
  if (existing) return;

  // Official Yandex Metrika loader: creates window.ym stub and loads tag.js
  (function (m: Window, e: Document, t: string, r: string, i: string) {
    (m as unknown as Record<string, unknown>)[i] =
      (m as unknown as Record<string, unknown>)[i] ||
      function () {
        const a = (m as unknown as Record<string, unknown>)[i] as { a?: unknown[] };
        (a.a = a.a || []).push(arguments);
      };
    const y = (m as unknown as Record<string, unknown>)[i] as { l?: number };
    y.l = 1 * new Date().getTime();
    const k = e.createElement(t) as HTMLScriptElement;
    const a = e.getElementsByTagName(t)[0];
    k.async = true;
    k.src = r;
    a?.parentNode?.insertBefore(k, a);
  })(window, document, "script", `${SCRIPT_URL}?id=${counterId}`, "ym");
}

/**
 * React component that loads Yandex Metrika script and initializes the counter.
 * Use `shouldInit={false}` and flip to `true` after user consent (e.g. cookies).
 */
export function YandexMetrika({
  counterId,
  shouldInit = true,
  initParams,
}: YandexMetrikaProps) {
  const initParamsRef = useRef(initParams);
  initParamsRef.current = initParams;

  useEffect(() => {
    loadScript(counterId);
  }, [counterId]);

  useEffect(() => {
    if (!shouldInit || typeof window === "undefined") return;

    const params = { ...DEFAULT_INIT, ...initParamsRef.current };

    const initMetrika = () => {
      if (window.ym) {
        window.ym(counterId, "init", params);
      }
    };

    if (window.ym) {
      initMetrika();
      return;
    }

    const checkInterval = setInterval(() => {
      if (window.ym) {
        initMetrika();
        clearInterval(checkInterval);
      }
    }, 100);
    const timeout = setTimeout(() => clearInterval(checkInterval), 10000);
    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, [shouldInit, counterId]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "noscript",
      null,
      React.createElement("div", null, 
        React.createElement("img", {
          src: `https://mc.yandex.ru/watch/${counterId}`,
          style: { position: "absolute", left: "-9999px" },
          alt: "",
        })
      )
    )
  );
}
