// src/types/redux-persist.d.ts
declare module 'redux-persist/lib/storage' {
    export const setItem: (key: string, value: any) => Promise<void>;
    export const getItem: (key: string) => Promise<any>;
    export const removeItem: (key: string) => Promise<void>;
}
