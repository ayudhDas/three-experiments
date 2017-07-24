// To let typescript stay cool about dynamic imports
// https://github.com/Microsoft/TypeScript/issues/12364#issuecomment-270819757

declare function _import<T>(path: string): Promise<T>;
