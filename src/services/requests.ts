import { request } from '@tager/web-core';

export function getExampleList() {
  return request.get({ path: '/tager/example' });
}

export function createExample() {
  return request.post({ path: '/tager/example', body: { name: 'example' } });
}
