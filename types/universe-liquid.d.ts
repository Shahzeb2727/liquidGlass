
declare module "universe-liquid/src/vas.js";
declare module "universe-liquid/src/liquidGL.js";

declare global {
  interface Window {
    html2canvas?: any;
    liquidGL?: any;
    __liquidGLRenderer__?: any;
  }
}

export {};