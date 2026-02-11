// 1️⃣ Tell TS the module exists
declare module "jquery.ripples";

// 2️⃣ Extend jQuery interface for the plugin
import "jquery";

declare global {
  interface JQuery {
    ripples(options?: {
      resolution?: number;
      dropRadius?: number;
      perturbance?: number;
      interactive?: boolean;
    }): JQuery;

    ripples(method: "destroy"): void;
  }
}

export {};
