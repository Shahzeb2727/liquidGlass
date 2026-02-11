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

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isSafari: boolean;
  hasWebGL: boolean;
  supportsRipples: boolean;
  effectLevel: 'full' | 'basic' | 'minimal';
}

export default function LiquidEffects() {
  const once = useRef(false);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (once.current) return;
    once.current = true;

    let destroyed = false;
    let $: any;
    let ripplesActive = false;

    // Comprehensive device detection
    const detectDevice = (): DeviceInfo => {
      const ua = navigator.userAgent.toLowerCase();
      
      const isMobile = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua);
      const isTablet = /ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua);
      const isIOS = /iphone|ipad|ipod/.test(ua);
      const isAndroid = /android/.test(ua);
      const isSafari = /safari/.test(ua) && !/chrome/.test(ua);
      
      // WebGL detection
      let hasWebGL = false;
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        hasWebGL = !!gl;
        if (gl) {
          // Try to get GPU info
          const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            console.log('[Device] GPU:', renderer);
          }
        }
      } catch (e) {
        console.warn('[Device] WebGL detection failed:', e);
        hasWebGL = false;
      }

      // Determine if device can handle ripples
      const supportsRipples = hasWebGL && 
                             !isIOS && // iOS Safari has issues with ripples
                             !(isAndroid && isMobile); // Android mobile struggles with ripples

      // Determine effect level
      let effectLevel: 'full' | 'basic' | 'minimal' = 'full';
      
      if (!hasWebGL) {
        effectLevel = 'minimal';
      } else if (isMobile || isTablet || isIOS) {
        effectLevel = 'basic';
      } else {
        effectLevel = 'full';
      }

      const info = {
        isMobile,
        isTablet,
        isIOS,
        isAndroid,
        isSafari,
        hasWebGL,
        supportsRipples,
        effectLevel
      };

      console.log('[Device] Detection:', info);
      return info;
    };

    // Wait for LiquidGL to be ready
    const waitForLiquidGL = (): Promise<boolean> => {
      return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 40; // 20 seconds
        
        const check = () => {
          if ((window as any).liquidGL) {
            console.log('[Effects] LiquidGL found');
            resolve(true);
            return;
          }
          
          attempts++;
          if (attempts >= maxAttempts) {
            console.error('[Effects] LiquidGL timeout');
            resolve(false);
            return;
          }
          
          setTimeout(check, 500);
        };
        
        // Also listen for the ready event
        const readyListener = () => {
          console.log('[Effects] LiquidGL ready event received');
          resolve(true);
        };
        
        window.addEventListener('liquidgl:ready', readyListener, { once: true });
        
        // Start checking
        check();
      });
    };

    // Main initialization
    const initEffects = async () => {
      try {
        // Detect device capabilities
        const device = detectDevice();
        setDeviceInfo(device);

        if (!device.hasWebGL) {
          setError('WebGL not supported on this device');
          return;
        }

        // Wait for LiquidGL
        const liquidGLReady = await waitForLiquidGL();
        
        if (!liquidGLReady) {
          setError('LiquidGL failed to load');
          return;
        }

        if (destroyed) return;

        // Load jQuery
        try {
          const jqMod = await import("jquery");
          $ = jqMod.default;
          (window as any).$ = $;
          (window as any).jQuery = $;
          console.log('[Effects] jQuery loaded');
          
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (jqError) {
          console.error('[Effects] jQuery failed:', jqError);
          setError('Failed to load jQuery');
          return;
        }

        if (destroyed) return;

        // Initialize Ripples (only if supported)
        if (device.supportsRipples && device.effectLevel === 'full') {
          try {
            // @ts-ignore
            await import("jquery.ripples");
            console.log('[Effects] Ripples library loaded');
            
            await new Promise(resolve => setTimeout(resolve, 200));

            const $ripples = $(".ripples");
            
            if ($ripples.length > 0 && typeof $ripples.ripples === 'function') {
              $ripples.ripples({
                resolution: 512,
                dropRadius: 20,
                perturbance: 0.04,
                interactive: true,
              });
              ripplesActive = true;
              console.log('[Effects] Ripples initialized');
            }
          } catch (ripplesError) {
            console.warn('[Effects] Ripples skipped:', ripplesError);
            // Non-critical - continue without ripples
          }
        } else {
          console.log('[Effects] Ripples disabled for this device');
        }

        if (destroyed) return;

        // Initialize LiquidGL with device-specific settings
        if ((window as any).liquidGL) {
          try {
            const settings = {
              target: ".menu-wrap",
              resolution: device.effectLevel === 'full' ? 1.0 : 
                         device.effectLevel === 'basic' ? 0.5 : 0.3,
              reveal: "none",
              refraction: 0,
              bevelDepth: device.effectLevel === 'full' ? 0.052 : 0.026,
              bevelWidth: device.effectLevel === 'full' ? 0.211 : 0.105,
              frost: device.effectLevel === 'full' ? 2 : 1,
              shadow: device.effectLevel === 'full',
              specular: device.effectLevel === 'full',
              tilt: false,
              tiltFactor: 0,
            };

            (window as any).liquidGL(settings);
            console.log('[Effects] LiquidGL initialized with settings:', settings);

            // Sync (desktop only)
            if (!device.isMobile && (window as any).liquidGL?.syncWith) {
              setTimeout(() => {
                if (!destroyed && (window as any).liquidGL?.syncWith) {
                  (window as any).liquidGL.syncWith();
                  console.log('[Effects] LiquidGL synced');
                }
              }, 500);
            }

          } catch (lgError) {
            console.error('[Effects] LiquidGL init error:', lgError);
            setError('LiquidGL initialization failed');
          }
        }

      } catch (error) {
        console.error('[Effects] Fatal error:', error);
        setError(String(error));
      }
    };

    // Cleanup function
    cleanupRef.current = () => {
      destroyed = true;
      try {
        if ($ && ripplesActive) {
          const $ripples = $(".ripples");
          if ($ripples.length > 0 && typeof $ripples.ripples === 'function') {
            $ripples.ripples("destroy");
            console.log('[Effects] Ripples destroyed');
          }
        }
      } catch (cleanupError) {
        console.error('[Effects] Cleanup error:', cleanupError);
      }
    };

    // Start initialization with a small delay for production
    const initDelay = process.env.NODE_ENV === 'production' ? 300 : 100;
    setTimeout(() => {
      if (!destroyed) initEffects();
    }, initDelay);

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  // Development debug info
  if (process.env.NODE_ENV === 'development' && deviceInfo) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 10,
        left: 10,
        padding: '8px 12px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        fontSize: '10px',
        borderRadius: 6,
        zIndex: 99999,
        fontFamily: 'monospace',
        maxWidth: '200px'
      }}>
        <div><strong>Effect Level:</strong> {deviceInfo.effectLevel}</div>
        <div><strong>WebGL:</strong> {deviceInfo.hasWebGL ? '✅' : '❌'}</div>
        <div><strong>Ripples:</strong> {deviceInfo.supportsRipples ? '✅' : '❌'}</div>
        <div><strong>Device:</strong> {deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablet' : 'Desktop'}</div>
        {error && <div style={{color: '#ff6666', marginTop: 4}}><strong>Error:</strong> {error}</div>}
      </div>
    );
  }

  // Production error display (only critical errors)
  if (error && error.includes('WebGL')) {
    return (
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        padding: '10px 16px',
        background: 'rgba(255,0,0,0.1)',
        border: '1px solid rgba(255,0,0,0.3)',
        borderRadius: 8,
        fontSize: 12,
        color: '#ff6666',
        zIndex: 9999
      }}>
        Glass effects unavailable
      </div>
    );
  }

  return null;
}