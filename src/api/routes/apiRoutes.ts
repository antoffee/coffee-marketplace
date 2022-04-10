export interface Route {
    (...pathSegments: string[]): string;
  }

  export type APIRoutes<T> = {
    [K in keyof T]: Route;
  };
