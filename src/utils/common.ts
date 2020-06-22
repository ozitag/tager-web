import { ServerResponse } from 'http';
import round from 'lodash/round';
import { MutableRefObject, Ref } from 'react';

import { LoadableData, Nullable } from '@/typings/common';
import { FETCH_STATUSES } from '@/constants/common';

/** https://github.com/zeit/next.js/issues/5354#issuecomment-520305040 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Reference:
 * https://github.com/reach/reach-ui/blob/v0.10.1/packages/utils/src/index.tsx#L159-L165
 */
export function canUseDOM() {
  return (
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );
}

export function isResSent(res: ServerResponse): boolean {
  return res.finished || res.headersSent;
}

export function isomorphicLog(message: any): void {
  const isError = message instanceof Error;

  if (isBrowser()) {
    const isDevelopmentEnv = process.env.NODE_ENV === 'development';
    if (!isDevelopmentEnv) return;

    if (isError) {
      console.error(message);
    } else {
      console.log(`%c ${message}`, 'color: green');
    }
  } else {
    const log = isError ? console.error : console.log;
    log(
      require('util').inspect(message, {
        colors: true,
      })
    );
  }
}

function getNumberSign(value: number): string {
  return value === 0 ? '' : value > 0 ? '+' : '-';
}
/** 12345678 => "12 345 678" */
export function formatNumber(
  value: number,
  options?: { precision?: number; withSign?: boolean }
): string {
  let result =
    typeof options?.precision === 'number'
      ? round(value, options.precision).toFixed(options.precision)
      : value.toString();

  result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ').replace('.', ',');

  if (options?.withSign) {
    result = getNumberSign(value) + result;
  }

  return result;
}

export function generateNumberArray(length: number): Array<number> {
  return Array.from({ length }, (_, index) => index);
}

export function isStringGuard(value: any): value is string {
  return typeof value === 'string';
}

export function isObjectGuard(value: any): value is object {
  return typeof value === 'object';
}

export function isNonNullObjectGuard(
  value: any
): value is { [key: string]: any } {
  return isObjectGuard(value) && Boolean(value);
}

function isEnum<T extends string>(value: any, enumArray: Array<T>): value is T {
  return enumArray.includes(value);
}

export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}

export function notFalsy<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return Boolean(value);
}

export function setRefValue<T>(ref: Ref<T>, value: T): void {
  if (!ref) return;

  if (typeof ref === 'function') {
    ref(value);
  } else {
    (ref as MutableRefObject<T>).current = value;
  }
}

/**
 * React.Ref uses the readonly type `React.RefObject` instead of
 * `React.MutableRefObject`, We pretty much always assume ref objects are
 * mutable (at least when we create them), so this type is a workaround so some
 * of the weird mechanics of using refs with TS.
 *
 * Reference:
 * https://github.com/reach/reach-ui/blob/v0.10.1/packages/utils/src/types.tsx#L13-L17
 */
export type AssignableRef<ValueType> =
  | {
      bivarianceHack(instance: ValueType | null): void;
    }['bivarianceHack']
  | MutableRefObject<ValueType | null>;

/**
 * Reference:
 * https://github.com/reach/reach-ui/blob/v0.10.1/packages/utils/src/index.tsx#L128-L148
 */
export function assignRef<RefValueType = any>(
  ref: AssignableRef<RefValueType> | null | undefined,
  value: any
): void {
  if (ref == null) return;
  if (typeof ref === 'function') {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(`Cannot assign value "${value}" to ref "${ref}"`);
    }
  }
}

export function convertSrcSet(sources: Array<string>): string {
  return sources
    .slice(0, 2)
    .map((url, index) => `${url} ${index + 1}x`)
    .join(', ');
}

/** Source: https://github.com/killmenot/valid-data-url/blob/master/index.js#L24 */
const DATA_URL_REGEX = /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)$/i;

export function getImageTypeFromUrl(url: string | null): string | null {
  if (!url) return null;

  const isValidDataUrl = DATA_URL_REGEX.test(url);

  if (isValidDataUrl) {
    const parts = url.trim().match(DATA_URL_REGEX);
    return parts ? parts[1] : null;
  }

  const dotPositionIndex = url.lastIndexOf('.');

  if (dotPositionIndex === -1) return null;

  const extension = url.slice(dotPositionIndex + 1);

  switch (extension) {
    case 'svg':
      return 'image/svg+xml';
    case 'webp':
      return 'image/webp';
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
  }

  return null;
}

export function createResourceLoader<DataType>(initialData: DataType) {
  return {
    getInitialResource(): LoadableData<DataType> {
      return {
        data: initialData,
        status: FETCH_STATUSES.IDLE,
        error: null,
      };
    },
    pending(): LoadableData<DataType> {
      return {
        data: initialData,
        status: FETCH_STATUSES.LOADING,
        error: null,
      };
    },
    fulfill(payload: DataType): LoadableData<DataType> {
      return {
        data: payload,
        status: FETCH_STATUSES.SUCCESS,
        error: null,
      };
    },
    reject(error?: Nullable<string>): LoadableData<DataType> {
      return {
        data: initialData,
        status: FETCH_STATUSES.FAILURE,
        error: error ?? null,
      };
    },
  };
}

export function trimEndSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function getOrigin(): string {
  return trimEndSlash(process.env.NEXT_PUBLIC_ORIGIN ?? '');
}

export function isAbsoluteUrl(url: string): boolean {
  return ['https:', 'http:'].some((protocol) => url.startsWith(protocol));
}

export function getAbsoluteUrl(urlOrPath: string): string {
  if (isAbsoluteUrl(urlOrPath)) return urlOrPath;

  return getOrigin() + urlOrPath;
}
