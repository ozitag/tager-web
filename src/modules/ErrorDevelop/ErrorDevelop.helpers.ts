import { get } from '@services/api';

import { SENTRY_REQUEST_ERROR } from './ErrorDevelop.constants';
import { SentryIssueResponse } from './ErrorDevelop.types';

export function getSentryFailureMessage(code: number, genericMessage: string) {
  return `ServerError: ${SENTRY_REQUEST_ERROR[code] ?? genericMessage}`;
}

export async function getSentryIssueById(id: string) {
  return (await getIssueById(id))?.data;
}

function getIssueById(id: string): Promise<{ data: SentryIssueResponse }> {
  return get({ path: `/tager/sentry-issue/${id}` });
}
