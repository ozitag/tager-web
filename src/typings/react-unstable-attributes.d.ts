import 'react';

/** Source: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet/blob/master/ADVANCED.md#adding-non-standard-attributes */
declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: 'auto' | 'eager' | 'lazy';
  }
}
