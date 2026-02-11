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






// "use client";

// import { useEffect, useRef } from "react";

// export default function LiquidEffects() {
//   const once = useRef(false);

//   useEffect(() => {
//     if (once.current) return;
//     once.current = true;

//     let destroyed = false;
//     let $: any;

//     const waitForLiquidGL = async () => {
//       if ((window as any).liquidGL) return;
//       await new Promise<void>((resolve) => {
//         window.addEventListener("liquidgl:ready", () => resolve(), { once: true });
//       });
//     };

//     const recaptureLater = () => {
//       // ripples/webgl first frame miss ho jaye to snapshot stable ho jata hai
//       const r = (window as any).__liquidGLRenderer__;
//       if (!r?.captureSnapshot) return;
//       setTimeout(() => !destroyed && r.captureSnapshot(), 250);
//       setTimeout(() => !destroyed && r.captureSnapshot(), 900);
//     };

//     (async () => {
//       await waitForLiquidGL();
//       if (destroyed) return;

//       // jQuery dynamic import (client-only)
//       const jqMod = await import("jquery");
//       $ = jqMod.default as any;
//       (window as any).$ = $;
//       (window as any).jQuery = $;

//       // ripples plugin
//       // @ts-ignore
//       await import("jquery.ripples");
//       if (destroyed) return;

//       $(".ripples").ripples({
//         resolution: 512,
//         dropRadius: 20,
//         perturbance: 0.04,
//         interactive: true,
//       });

//       // liquidGL init (fast + no 1s fade)
//       (window as any).liquidGL({
//         target: ".menu-wrap",
//         resolution: 1.0,
//         reveal: "none",
//         refraction: 0,
//         bevelDepth: 0.052,
//         bevelWidth: 0.211,
//         frost: 2,
//         shadow: true,
//         specular: true,
//         tilt: false,
//         tiltFactor: 5,
//       });

//       (window as any).liquidGL?.syncWith?.();

//       recaptureLater();
//     })().catch(console.error);

//     return () => {
//       destroyed = true;
//       try {
//         if ($) $(".ripples").ripples("destroy");
//       } catch {}
//     };
//   }, []);

//   return null;
// }



// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function LiquidEffects() {
//   const once = useRef(false);
//   const [isSupported, setIsSupported] = useState(true);

//   // Add to LiquidEffects component
// useEffect(() => {
//   console.log('Device info:', {
//     userAgent: navigator.userAgent,
//     webgl: !!document.createElement('canvas').getContext('webgl'),
//     touch: 'ontouchstart' in window,
//     pixelRatio: window.devicePixelRatio
//   });
// }, []);

//   useEffect(() => {
//     if (once.current) return;
//     once.current = true;

//     let destroyed = false;
//     let $: any;
//     let ripplesInitialized = false;

//     // Check device capabilities
//     const checkSupport = () => {
//       // Check for WebGL
//       const canvas = document.createElement('canvas');
//       const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
//       // Check for touch device (mobile)
//       const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
//       // Some mobile browsers have issues with these effects
//       const isProblematicMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && 
//                                    !/Chrome/i.test(navigator.userAgent);
      
//       if (!gl) {
//         console.warn('WebGL not supported');
//         return false;
//       }
      
//       if (isProblematicMobile) {
//         console.warn('Device might have compatibility issues');
//       }
      
//       return true;
//     };

//     const waitForLiquidGL = async () => {
//       if ((window as any).liquidGL) return;
      
//       return new Promise<void>((resolve, reject) => {
//         const timeout = setTimeout(() => {
//           reject(new Error('LiquidGL load timeout'));
//         }, 10000); // 10 second timeout
        
//         window.addEventListener("liquidgl:ready", () => {
//           clearTimeout(timeout);
//           resolve();
//         }, { once: true });
//       });
//     };

//     const recaptureLater = () => {
//       const r = (window as any).__liquidGLRenderer__;
//       if (!r?.captureSnapshot) return;
      
//       const captures = [250, 500, 900, 1500];
//       captures.forEach(delay => {
//         setTimeout(() => {
//           if (!destroyed && r.captureSnapshot) {
//             try {
//               r.captureSnapshot();
//             } catch (e) {
//               console.error('Snapshot capture failed:', e);
//             }
//           }
//         }, delay);
//       });
//     };

//     (async () => {
//       try {
//         // Check support
//         if (!checkSupport()) {
//           setIsSupported(false);
//           return;
//         }

//         await waitForLiquidGL();
//         if (destroyed) return;

//         // jQuery dynamic import
//         const jqMod = await import("jquery");
//         $ = jqMod.default as any;
//         (window as any).$ = $;
//         (window as any).jQuery = $;

//         // Small delay to ensure jQuery is ready
//         await new Promise(resolve => setTimeout(resolve, 100));

//         // ripples plugin with error handling
//         try {
//           // @ts-ignore
//           await import("jquery.ripples");
//           if (destroyed) return;

//           // Initialize ripples with fallback
//           const $ripples = $(".ripples");
//           if ($ripples.length > 0) {
//             $ripples.ripples({
//               resolution: window.innerWidth > 768 ? 512 : 256, // Lower resolution for mobile
//               dropRadius: 20,
//               perturbance: 0.04,
//               interactive: true,
//             });
//             ripplesInitialized = true;
//           }
//         } catch (ripplesError) {
//           console.error("Ripples initialization failed:", ripplesError);
//         }

//         // liquidGL init with error handling
//         try {
//           if ((window as any).liquidGL) {
//             (window as any).liquidGL({
//               target: ".menu-wrap",
//               resolution: window.innerWidth > 768 ? 1.0 : 0.5, // Lower resolution for mobile
//               reveal: "none",
//               refraction: 0,
//               bevelDepth: 0.052,
//               bevelWidth: 0.211,
//               frost: 2,
//               shadow: true,
//               specular: true,
//               tilt: false,
//               tiltFactor: 5,
//             });

//             // Sync if available
//             if ((window as any).liquidGL?.syncWith) {
//               (window as any).liquidGL.syncWith();
//             }

//             recaptureLater();
//           }
//         } catch (liquidError) {
//           console.error("LiquidGL initialization failed:", liquidError);
//         }
        
//       } catch (error) {
//         console.error("LiquidEffects setup failed:", error);
//         setIsSupported(false);
//       }
//     })();

//     return () => {
//       destroyed = true;
//       try {
//         if ($ && ripplesInitialized) {
//           $(".ripples").ripples("destroy");
//         }
//       } catch (e) {
//         console.error("Cleanup failed:", e);
//       }
//     };
//   }, []);

//   if (!isSupported) {
//     return (
//       <div style={{
//         position: 'fixed',
//         bottom: 20,
//         right: 20,
//         padding: '10px 20px',
//         background: 'rgba(255,0,0,0.1)',
//         border: '1px solid rgba(255,0,0,0.3)',
//         borderRadius: 8,
//         fontSize: 12,
//         color: '#ff6666',
//         zIndex: 9999
//       }}>
//         Glass effects not supported on this device
//       </div>
//     );
//   }

//   return null;
// }











// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function LiquidEffects() {
//   const once = useRef(false);
//   const [isSupported, setIsSupported] = useState(true);
//   const captureTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   // Device info logging
//   useEffect(() => {
//     console.log('Device info:', {
//       userAgent: navigator.userAgent,
//       webgl: !!document.createElement('canvas').getContext('webgl'),
//       touch: 'ontouchstart' in window,
//       pixelRatio: window.devicePixelRatio
//     });
//   }, []);

//   useEffect(() => {
//     if (once.current) return;
//     once.current = true;

//     let destroyed = false;
//     let $: any;
//     let ripplesInitialized = false;

//     // Check device capabilities
//     const checkSupport = () => {
//       const canvas = document.createElement('canvas');
//       const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
//       const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
//       const isProblematicMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && 
//                                    !/Chrome/i.test(navigator.userAgent);
      
//       if (!gl) {
//         console.warn('WebGL not supported');
//         return false;
//       }
      
//       if (isProblematicMobile) {
//         console.warn('Device might have compatibility issues');
//       }
      
//       return true;
//     };

//     const waitForLiquidGL = async () => {
//       if ((window as any).liquidGL) return;
      
//       return new Promise<void>((resolve, reject) => {
//         const timeout = setTimeout(() => {
//           reject(new Error('LiquidGL load timeout'));
//         }, 10000);
        
//         window.addEventListener("liquidgl:ready", () => {
//           clearTimeout(timeout);
//           resolve();
//         }, { once: true });
//       });
//     };

//     // Single capture function to avoid multiple blinks
//     const captureOnce = () => {
//       const r = (window as any).__liquidGLRenderer__;
//       if (!r?.captureSnapshot || destroyed) return;
      
//       try {
//         r.captureSnapshot();
//       } catch (e) {
//         console.error('Snapshot capture failed:', e);
//       }
//     };

//     (async () => {
//       try {
//         // Check support
//         if (!checkSupport()) {
//           setIsSupported(false);
//           return;
//         }

//         await waitForLiquidGL();
//         if (destroyed) return;

//         // jQuery dynamic import
//         const jqMod = await import("jquery");
//         $ = jqMod.default as any;
//         (window as any).$ = $;
//         (window as any).jQuery = $;

//         // Small delay to ensure jQuery is ready
//         await new Promise(resolve => setTimeout(resolve, 100));

//         // ripples plugin with error handling
//         try {
//           // @ts-ignore
//           await import("jquery.ripples");
//           if (destroyed) return;

//           const $ripples = $(".ripples");
//           if ($ripples.length > 0) {
//             $ripples.ripples({
//               resolution: window.innerWidth > 768 ? 512 : 256,
//               dropRadius: 20,
//               perturbance: 0.04,
//               interactive: true,
//             });
//             ripplesInitialized = true;
//           }
//         } catch (ripplesError) {
//           console.error("Ripples initialization failed:", ripplesError);
//         }

//         // liquidGL init with error handling
//         try {
//           if ((window as any).liquidGL) {
//             (window as any).liquidGL({
//               target: ".menu-wrap",
//               resolution: window.innerWidth > 768 ? 1.0 : 0.5,
//               reveal: "none",
//               refraction: 0,
//               bevelDepth: 0.052,
//               bevelWidth: 0.211,
//               frost: 2,
//               shadow: true,
//               specular: true,
//               tilt: false,
//               tiltFactor: 5,
//             });

//             // Sync if available
//             if ((window as any).liquidGL?.syncWith) {
//               (window as any).liquidGL.syncWith();
//             }

//             // Only capture once after a delay, not multiple times
//             captureTimeoutRef.current = setTimeout(() => {
//               if (!destroyed) captureOnce();
//             }, 500);
//           }
//         } catch (liquidError) {
//           console.error("LiquidGL initialization failed:", liquidError);
//         }
        
//       } catch (error) {
//         console.error("LiquidEffects setup failed:", error);
//         setIsSupported(false);
//       }
//     })();

//     return () => {
//       destroyed = true;
      
//       // Clear any pending captures
//       if (captureTimeoutRef.current) {
//         clearTimeout(captureTimeoutRef.current);
//       }
      
//       try {
//         if ($ && ripplesInitialized) {
//           $(".ripples").ripples("destroy");
//         }
//       } catch (e) {
//         console.error("Cleanup failed:", e);
//       }
//     };
//   }, []);

//   if (!isSupported) {
//     return (
//       <div style={{
//         position: 'fixed',
//         bottom: 20,
//         right: 20,
//         padding: '10px 20px',
//         background: 'rgba(255,0,0,0.1)',
//         border: '1px solid rgba(255,0,0,0.3)',
//         borderRadius: 8,
//         fontSize: 12,
//         color: '#ff6666',
//         zIndex: 9999
//       }}>
//         Glass effects not supported on this device
//       </div>
//     );
//   }

//   return null;
// }




// fully robhust


// app/components/LiquidEffects.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export default function LiquidEffects() {
  const once = useRef(false);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add to LiquidEffects component
useEffect(() => {
  console.log('Device info:', {
    userAgent: navigator.userAgent,
    webgl: !!document.createElement('canvas').getContext('webgl'),
    touch: 'ontouchstart' in window,
    pixelRatio: window.devicePixelRatio
  });
}, []);

  useEffect(() => {
    if (once.current) return;
    once.current = true;

    let destroyed = false;
    let $: any;
    let ripplesInitialized = false;

    const initEffects = async () => {
      try {
        // Add production logging
        const isProd = process.env.NODE_ENV === 'production';
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        
        console.log('Environment:', {
          isProd,
          baseUrl,
          protocol: window.location.protocol,
          host: window.location.host
        });

        // Simple WebGL check
        const canvas = document.createElement('canvas');
        const hasWebGL = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
        
        if (!hasWebGL) {
          setError('WebGL not supported');
          setIsSupported(false);
          return;
        }

        // Wait for LiquidGL with production timeout
        const waitForLiquidGL = async (): Promise<boolean> => {
          let attempts = 0;
          const maxAttempts = 30; // 15 seconds total
          
          while (attempts < maxAttempts) {
            if ((window as any).liquidGL) {
              console.log('LiquidGL found after', attempts, 'attempts');
              return true;
            }
            
            await new Promise(resolve => setTimeout(resolve, 500));
            attempts++;
          }
          
          console.error('LiquidGL not found after', attempts, 'attempts');
          return false;
        };

        const liquidGLReady = await waitForLiquidGL();
        
        if (!liquidGLReady) {
          setError('LiquidGL failed to load');
          setIsSupported(false);
          return;
        }

        if (destroyed) return;

        // Load jQuery with error handling
        try {
          const jqMod = await import("jquery");
          $ = jqMod.default as any;
          (window as any).$ = $;
          (window as any).jQuery = $;
          console.log('jQuery loaded successfully');
        } catch (jqError) {
          console.error('jQuery load error:', jqError);
          setError('jQuery failed to load');
          setIsSupported(false);
          return;
        }

        // Wait for jQuery
        await new Promise(resolve => setTimeout(resolve, 300));

        // Try ripples but don't fail if it doesn't work
        try {
          // @ts-ignore
          await import("jquery.ripples");
          await new Promise(resolve => setTimeout(resolve, 200));
          
          const $ripples = $(".ripples");
          if ($ripples.length > 0 && $.fn.ripples) {
            $ripples.ripples({
              resolution: 512,
              dropRadius: 20,
              perturbance: 0.04,
              interactive: true,
            });
            ripplesInitialized = true;
            console.log('Ripples initialized');
          }
        } catch (ripplesError) {
          console.warn('Ripples skipped (non-critical):', ripplesError);
        }

        // Initialize LiquidGL
        if ((window as any).liquidGL) {
          try {
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
            
            console.log('LiquidGL initialized');
          } catch (liquidError) {
            console.error('LiquidGL init error:', liquidError);
            setError('LiquidGL initialization failed');
            setIsSupported(false);
          }
        }
        
      } catch (error) {
        console.error("Effects initialization error:", error);
        setError(String(error));
        setIsSupported(false);
      }
    };

    // Delay initialization slightly in production
    setTimeout(() => {
      initEffects();
    }, 100);

    return () => {
      destroyed = true;
      try {
        if ($ && ripplesInitialized && $.fn.ripples) {
          $(".ripples").ripples("destroy");
        }
      } catch (e) {
        console.error("Cleanup error:", e);
      }
    };
  }, []);

  if (!isSupported && error) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        padding: '10px 20px',
        background: 'rgba(255,0,0,0.1)',
        border: '1px solid rgba(255,0,0,0.3)',
        borderRadius: 8,
        fontSize: 11,
        color: '#ff6666',
        zIndex: 9999,
        maxWidth: '300px'
      }}>
        Effect Error: {error}
      </div>
    );
  }

  return null;
}