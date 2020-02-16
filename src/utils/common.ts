import { ServerResponse } from 'http';
import round from 'lodash/round';

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function isResSent(res: ServerResponse): boolean {
  return res.finished || res.headersSent;
}

function getNumberSign(value: number): string {
  return value === 0 ? '' : value > 0 ? '+' : '-';
}
/** 12345678 => "12 345 678" */
export function formatNumber(
  value: number,
  options?: { precision?: number; withSign?: boolean },
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
