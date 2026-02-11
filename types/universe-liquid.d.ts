
// declare module "universe-liquid/src/vas.js";
// declare module "universe-liquid/src/liquidGL.js";

// declare global {
//   interface Window {
//     html2canvas?: any;
//     liquidGL?: any;
//     __liquidGLRenderer__?: any;
//   }
// }

// export {};


// types/universe-liquid.d.ts
declare module "universe-liquid/src/vas.js" {
  const vas: any;
  export = vas;
}

declare module "universe-liquid/src/liquidGL.js" {
  const liquidGL: any;
  export = liquidGL;
}

declare module "jquery.ripples" {
  const ripples: any;
  export = ripples;
}

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