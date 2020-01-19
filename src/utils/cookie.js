import Cookies from 'js-cookie';
import { isBrowser, isResSent } from './common';

const AUTH_TOKEN_FIELD = 'auth';

function getCookieFromContext(name, ctx = {}) {
  if (isBrowser()) {
    return Cookies.get(name);
  }

  if (ctx.req) {
    const cookie = require('cookie');
    return cookie.parse(ctx.req.headers.cookie || '')[name];
  }

  return null;
}

function getTokenMap(ctx = {}) {
  const cookie = getCookieFromContext(AUTH_TOKEN_FIELD, ctx);
  let parsedCookie = null;

  try {
    parsedCookie = JSON.parse(cookie);
  } catch (error) {
    removeCookie(AUTH_TOKEN_FIELD, ctx);
  }
  return parsedCookie || {};
}

export function getCookieField(field, ctx = {}) {
  const tokenMap = getTokenMap(ctx);
  return tokenMap[field];
}

export function updateCookie(name, value, ctx = {}) {
  if (isBrowser()) {
    Cookies.set(name, value);
  } else {
    if (ctx.res && !isResSent(ctx.res)) {
      const cookie = require('cookie');
      ctx.res.setHeader('Set-Cookie', cookie.serialize(name, value));
    } else {
      console.warn('Cannot update cookie, because "req" is undefined or request headers are sent');
    }
  }
}

export function updateCookieField(name, value, ctx = {}) {
  const tokenMap = getTokenMap(ctx);
  const newCookie = { ...tokenMap, [name]: value };
  updateCookie(AUTH_TOKEN_FIELD, JSON.stringify(newCookie), ctx);
}

export function removeCookie(name, ctx = {}) {
  if (isBrowser()) {
    Cookies.remove(name);
  } else {
    if (ctx.res && !isResSent(ctx.res)) {
      const cookie = require('cookie');
      ctx.res.setHeader('Set-Cookie', cookie.serialize(name, '', { expires: new Date() }));
    } else {
      console.warn('Cannot clear cookie, because "req" is undefined or request headers are sent');
    }
  }
}

export function removeCookieField(field, ctx) {
  updateCookieField(field, undefined, ctx);
}
