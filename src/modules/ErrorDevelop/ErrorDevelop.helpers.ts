import { get } from '@services/api';

import { SentryIssueResponse } from './ErrorDevelop.types';

export async function getErrorDetails(id: string) {
  return (await getIssueById(id))?.data;
}

function getIssueById(id: string): Promise<{ data: SentryIssueResponse }> {
  return get({ path: `/tager/sentry-issue/${id}` });
}

export function getFailureMessage(code: number, message: string) {
  if (code === 404) return 'TAGER Backend Sentry module is not installed';
  else return `Tager Sentry Response: ${message}`;
}
