// "use client";

// import { useEffect } from "react";

// export default function LiquidGLLoader() {
//   useEffect(() => {
//     import("universe-liquid/src/liquidGL.js");
//   }, []);

//   return null;
// }


"use client";

import { useEffect, useRef } from "react";

export default function LiquidGLLoader() {
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return; // StrictMode guard
    once.current = true;

    let cancelled = false;

    (async () => {
      // 1) html2canvas ko global banao (liquidGL global check karta hai)
      const h2c = await import("html2canvas");
      (window as any).html2canvas = h2c.default;

      // 2) vas.js FIRST
      // await import("universe-liquid/src/vas.js");

      // 3) then liquidGL.js (window.liquidGL define hota hai)
      await import("universe-liquid/src/liquidGL.js");

      if (cancelled) return;
      window.dispatchEvent(new Event("liquidgl:ready"));
    })().catch(console.error);

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}