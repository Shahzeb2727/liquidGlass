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




// "use client";

// import { useEffect, useRef } from "react";

// export default function LiquidGLLoader() {
//   const once = useRef(false);

//   useEffect(() => {
//     if (once.current) return;
//     once.current = true;

//     let cancelled = false;

//     (async () => {
//       try {
//         // Check WebGL support first
//         const canvas = document.createElement('canvas');
//         const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
//         if (!gl) {
//           console.error('WebGL not supported on this device');
//           return;
//         }

//         // 1) html2canvas
//         const h2c = await import("html2canvas");
//         (window as any).html2canvas = h2c.default;

//         // 2) vas.js FIRST - UNCOMMENT THIS!
//         // @ts-ignore
//         await import("universe-liquid/src/vas.js");

//         // 3) then liquidGL.js
//         // @ts-ignore
//         await import("universe-liquid/src/liquidGL.js");

//         if (cancelled) return;
        
//         // Add a small delay to ensure everything is loaded
//         setTimeout(() => {
//           window.dispatchEvent(new Event("liquidgl:ready"));
//         }, 100);
        
//       } catch (error) {
//         console.error("Failed to load LiquidGL:", error);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return null;
// }



// "use client";

// import { useEffect, useRef } from "react";

// export default function LiquidGLLoader() {
//   const once = useRef(false);

//   useEffect(() => {
//     if (once.current) return;
//     once.current = true;

//     let cancelled = false;

//     (async () => {
//       try {
//         // Check WebGL support first
//         const canvas = document.createElement('canvas');
//         const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
//         if (!gl) {
//           console.error('WebGL not supported on this device');
//           return;
//         }

//         // 1) html2canvas
//         const h2c = await import("html2canvas");
//         (window as any).html2canvas = h2c.default;

//         // 2) Try to load vas.js, but don't fail if it's not there
//         try {
//           await import("universe-liquid/src/vas.js" as any);
//         } catch (vasError) {
//           console.warn("vas.js not loaded, continuing anyway:", vasError);
//         }

//         // 3) then liquidGL.js
//         await import("universe-liquid/src/liquidGL.js" as any);

//         if (cancelled) return;
        
//         // Add a small delay to ensure everything is loaded
//         setTimeout(() => {
//           window.dispatchEvent(new Event("liquidgl:ready"));
//         }, 100);
        
//       } catch (error) {
//         console.error("Failed to load LiquidGL:", error);
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   return null;
// }








// app/components/LiquidGLLoader.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function LiquidGLLoader() {
  const once = useRef(false);
  const [loadStatus, setLoadStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (once.current) return;
    once.current = true;

    let cancelled = false;

    const loadScripts = async () => {
      try {
        const startTime = Date.now();
        console.log('[LiquidGL] Starting loader...');

        // Check if already loaded (page refresh case)
        if ((window as any).liquidGL) {
          console.log('[LiquidGL] Already loaded, dispatching ready event');
          setTimeout(() => {
            window.dispatchEvent(new Event("liquidgl:ready"));
            setLoadStatus('success');
          }, 100);
          return;
        }

        // 1) Load html2canvas
        try {
          const h2c = await import("html2canvas");
          (window as any).html2canvas = h2c.default;
          console.log('[LiquidGL] html2canvas loaded');
        } catch (h2cError) {
          console.error('[LiquidGL] html2canvas failed:', h2cError);
          throw new Error('Failed to load html2canvas');
        }

        if (cancelled) return;

        // 2) Load vas.js (optional but recommended)
        try {
          // @ts-ignore
          await import("universe-liquid/src/vas.js");
          console.log('[LiquidGL] vas.js loaded');
        } catch (vasError) {
          console.warn('[LiquidGL] vas.js not loaded (may not be required):', vasError);
          // Don't fail - vas.js might not be essential
        }

        if (cancelled) return;

        // 3) Load liquidGL.js
        try {
          // @ts-ignore
          await import("universe-liquid/src/liquidGL.js");
          console.log('[LiquidGL] liquidGL.js loaded');
        } catch (lgError) {
          console.error('[LiquidGL] liquidGL.js failed:', lgError);
          throw new Error('Failed to load liquidGL.js');
        }

        if (cancelled) return;

        // Wait a bit to ensure script execution
        await new Promise(resolve => setTimeout(resolve, 200));

        // Verify liquidGL is available
        if (!(window as any).liquidGL) {
          throw new Error('liquidGL not found on window after import');
        }

        const loadTime = Date.now() - startTime;
        console.log(`[LiquidGL] All scripts loaded successfully in ${loadTime}ms`);
        
        // Dispatch ready event
        setTimeout(() => {
          if (!cancelled) {
            window.dispatchEvent(new Event("liquidgl:ready"));
            setLoadStatus('success');
            console.log('[LiquidGL] Ready event dispatched');
          }
        }, 100);

      } catch (error) {
        console.error("[LiquidGL] Fatal loading error:", error);
        setLoadStatus('error');
      }
    };

    loadScripts();

    return () => {
      cancelled = true;
    };
  }, []);

  // Show loading indicator in development only
  if (process.env.NODE_ENV === 'development' && loadStatus === 'loading') {
    return (
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        padding: '6px 12px',
        background: 'rgba(0,0,0,0.7)',
        color: 'yellow',
        fontSize: '11px',
        borderRadius: 4,
        zIndex: 99999
      }}>
        🔄 Loading LiquidGL...
      </div>
    );
  }

  return null;
}