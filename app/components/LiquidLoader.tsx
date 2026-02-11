// "use client";

// import { useEffect } from "react";

// export default function LiquidGLLoader() {
//   useEffect(() => {
//     import("universe-liquid/src/liquidGL.js");
//   }, []);

//   return null;
// }


// "use client";

// import { useEffect, useRef } from "react";

// export default function LiquidGLLoader() {
//   const once = useRef(false);

//   useEffect(() => {
//     if (once.current) return; // StrictMode guard
//     once.current = true;

//     let cancelled = false;

//     (async () => {
//       // 1) html2canvas ko global banao (liquidGL global check karta hai)
//       const h2c = await import("html2canvas");
//       (window as any).html2canvas = h2c.default;

//       // 2) vas.js FIRST
//       // await import("universe-liquid/src/vas.js");

//       // 3) then liquidGL.js (window.liquidGL define hota hai)
//       await import("universe-liquid/src/liquidGL.js");

//       if (cancelled) return;
//       window.dispatchEvent(new Event("liquidgl:ready"));
//     })().catch(console.error);

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return null;
// }




"use client";

import { useEffect, useRef } from "react";

export default function LiquidGLLoader() {
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    once.current = true;

    let cancelled = false;

    (async () => {
      try {
        // Check WebGL support first
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          console.error('WebGL not supported on this device');
          return;
        }

        // 1) html2canvas
        const h2c = await import("html2canvas");
        (window as any).html2canvas = h2c.default;

        // 2) vas.js FIRST - UNCOMMENT THIS!
        // @ts-ignore
        await import("universe-liquid/src/vas.js");

        // 3) then liquidGL.js
        // @ts-ignore
        await import("universe-liquid/src/liquidGL.js");

        if (cancelled) return;
        
        // Add a small delay to ensure everything is loaded
        setTimeout(() => {
          window.dispatchEvent(new Event("liquidgl:ready"));
        }, 100);
        
      } catch (error) {
        console.error("Failed to load LiquidGL:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}