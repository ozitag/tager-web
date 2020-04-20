import { ServerResponse } from 'http';
import round from 'lodash/round';

/** https://github.com/zeit/next.js/issues/5354#issuecomment-520305040 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function isResSent(res: ServerResponse): boolean {
  return res.finished || res.headersSent;
}

export function isomorphicLog(message: any): void {
  if (isBrowser()) {
    const isDevelopmentEnv = process.env.NODE_ENV === 'development';
    isDevelopmentEnv && console.log(`%c ${message}`, 'color: green');
  } else {
    console.log(
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
