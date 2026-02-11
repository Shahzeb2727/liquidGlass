// "use client";

// import { useEffect } from "react";
// import $ from "jquery";

// export default function LiquidEffects() {
//     useEffect(() => {
//         let glassEffect: any;
//         let destroyed = false;

//         async function init() {
//             // Make jQuery global
//             (window as any).$ = $;
//             (window as any).jQuery = $;

//             // Load ripples AFTER globals exist
//             // @ts-ignore
//             await import("jquery.ripples");

//             if (destroyed) return;

//             // Init ripples
//             $(".ripples").each(function () {
//                 $(this).ripples({
//                     resolution: 512,
//                     dropRadius: 20,
//                     perturbance: 0.04,
//                     interactive: true,
//                 });
//             });

//             // Init liquidGL
//             if (typeof (window as any).liquidGL === "function") {
//                 glassEffect = (window as any).liquidGL({
//                     target: ".menu-wrap",
//                     refraction: 0,
//                     bevelDepth: 0.052,
//                     bevelWidth: 0.211,
//                     frost: 2,
//                     shadow: true,
//                     specular: true,
//                     tilt: false,
//                     tiltFactor: 5,
//                     reveal: "fade",
//                 });
//             }

//             (window as any).liquidGL?.syncWith();
//         }

//         init();

//         return () => {
//             destroyed = true;
//             try {
//                 $(".ripples").ripples("destroy");
//             } catch { }
//         };
//     }, []);

//     return null;
// }



// @ts-ignore




// "use client";

// import { useEffect } from "react";

// export default function LiquidEffects() {
//     useEffect(() => {
//         let destroyed = false;
//         let $: any;

//         const loadEffects = async () => {
//             if (typeof window === "undefined") return;

//             // Dynamically load jQuery (client only)
//             const jqueryModule = await import("jquery");
//             $ = jqueryModule.default;

//             // Make jQuery global for plugins
//             (window as any).$ = $;
//             (window as any).jQuery = $;

//             // Load ripples AFTER jQuery exists
// // @ts-ignore
//             await import("jquery.ripples");

//             if (destroyed) return;

//             $(".ripples").ripples({
//                 resolution: 256,
//                 dropRadius: 20,
//                 perturbance: 0.03,
//                 interactive: true,
//             });

//             // If liquidGL is loaded globally via script tag
//             if (typeof (window as any).liquidGL === "function") {
//                 (window as any).liquidGL({
//                     target: ".menu-wrap",
//                     // snapshot: ".hero-image",
//                     refraction: 0,
//                     bevelDepth: 0.052,
//                     bevelWidth: 0.211,
//                     frost: 2,
//                     shadow: true,
//                     specular: true,
//                     tilt: false,
//                     reveal: "fade",
//                 });

//                 (window as any).liquidGL.syncWith?.();
//             }
//         };

//         loadEffects();

//         return () => {
//             destroyed = true;
//             try {
//                 $(".ripples").ripples("destroy");
//             } catch { }
//         };
//     }, []);

//     return null;
// }






"use client";

import { useEffect, useRef } from "react";

export default function LiquidEffects() {
  const once = useRef(false);

  useEffect(() => {
    if (once.current) return;
    once.current = true;

    let destroyed = false;
    let $: any;

    const waitForLiquidGL = async () => {
      if ((window as any).liquidGL) return;
      await new Promise<void>((resolve) => {
        window.addEventListener("liquidgl:ready", () => resolve(), { once: true });
      });
    };

    const recaptureLater = () => {
      // ripples/webgl first frame miss ho jaye to snapshot stable ho jata hai
      const r = (window as any).__liquidGLRenderer__;
      if (!r?.captureSnapshot) return;
      setTimeout(() => !destroyed && r.captureSnapshot(), 250);
      setTimeout(() => !destroyed && r.captureSnapshot(), 900);
    };

    (async () => {
      await waitForLiquidGL();
      if (destroyed) return;

      // jQuery dynamic import (client-only)
      const jqMod = await import("jquery");
      $ = jqMod.default as any;
      (window as any).$ = $;
      (window as any).jQuery = $;

      // ripples plugin
      // @ts-ignore
      await import("jquery.ripples");
      if (destroyed) return;

      $(".ripples").ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04,
        interactive: true,
      });

      // liquidGL init (fast + no 1s fade)
      (window as any).liquidGL({
        target: ".menu-wrap",
        resolution: 1.0,
        reveal: "none",
        refraction: 0,
        bevelDepth: 0.052,
        bevelWidth: 0.211,
        frost: 2,
        shadow: true,
        specular: true,
        tilt: false,
        tiltFactor: 5,
      });

      (window as any).liquidGL?.syncWith?.();

      recaptureLater();
    })().catch(console.error);

    return () => {
      destroyed = true;
      try {
        if ($) $(".ripples").ripples("destroy");
      } catch {}
    };
  }, []);

  return null;
}