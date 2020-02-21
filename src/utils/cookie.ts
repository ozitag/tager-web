import { IncomingMessage, ServerResponse } from 'http';
import Cookies from 'js-cookie';

import { Nullable } from '@typings/common';

import { isBrowser, isResSent } from './common';

const COOKIE_NAME = 'app';

function getCookieValue(req?: IncomingMessage): Nullable<string> {
  if (isBrowser()) {
    return Cookies.get(COOKIE_NAME) ?? null;
  }

  if (req) {
    const cookie = require('cookie');
    return cookie.parse(req.headers.cookie ?? '')[COOKIE_NAME];
  }

  return null;
}

function updateCookieValue(value: string, res?: ServerResponse): void {
  if (isBrowser()) {
    Cookies.set(COOKIE_NAME, value);
  } else {
    if (res && !isResSent(res)) {
      const cookie = require('cookie');
      res.setHeader('Set-Cookie', cookie.serialize(COOKIE_NAME, value));
    } else {
      if (!res) {
        console.warn('Cannot update cookie, because response is empty');
      } else if (isResSent(res)) {
        console.warn('Cannot update cookie, because response headers are sent');
      }
    }
  }
}

export function getCookie(
  field: string,
  req?: IncomingMessage,
): Nullable<string> {
  const cookieValue = getCookieValue(req);

  const params = new URLSearchParams(cookieValue ?? '');
  return params.get(field);
}

export function updateCookie(
  field: string,
  value: string,
  context?: { res?: ServerResponse; req?: IncomingMessage },
): void {
  const cookieValue = getCookieValue(context?.req);

  const params = new URLSearchParams(cookieValue ?? '');
  params.set(field, value);

  const updatedCookieValue = params.toString();

  updateCookieValue(updatedCookieValue, context?.res);
}

export function removeCookie(
  field: string,
  context?: { res?: ServerResponse; req?: IncomingMessage },
): void {
  const cookieValue = getCookieValue(context?.req);

  const params = new URLSearchParams(cookieValue ?? '');
  params.delete(field);

  const updatedCookieValue = params.toString();

  updateCookieValue(updatedCookieValue, context?.res);
}
