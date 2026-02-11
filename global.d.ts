// declare module "universe-liquid/src/liquidGL.js";



// global.d.ts (in root)
declare module "universe-liquid/src/vas.js";
declare module "universe-liquid/src/liquidGL.js";
declare module "jquery.ripples";

declare global {
  interface Window {
    html2canvas?: any;
    liquidGL?: any;
    __liquidGLRenderer__?: any;
    $?: any;
    jQuery?: any;
  }
}

export {};