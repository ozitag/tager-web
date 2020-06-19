import { get } from '@services/api';

export type SentryIssueResponse = {
  title: string;
  file: string;
  sentryUrl: string;
  stacktrace: Array<{
    file: string;
    line: number;
    code: Array<string>;
  }>;
};

const SENTRY_REQUEST_ERROR: { [key: number]: string } = {
  404: 'Tager Backend Sentry module is not installed',
  500: 'Error details are not available',
};

export function getSentryFailureMessage(code: number, genericMessage: string) {
  return `ServerError: ${SENTRY_REQUEST_ERROR[code] ?? genericMessage}`;
}

export async function getSentryIssueById(id: string) {
  return (await getIssueById(id))?.data;
}

function getIssueById(id: string): Promise<{ data: SentryIssueResponse }> {
  return get({ path: `/tager/sentry-issue/${id}` });
}
