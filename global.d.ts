/// <reference types="vitest" />
import '@testing-library/jest-dom';

declare module 'vitest' {
  interface Assertion<T = any> extends jest.Matchers<void, T> {}
}
declare global {
  interface Window {
    showToastGlobal: (message: string) => void;
  }
}
