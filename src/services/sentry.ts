import { get } from '@services/api';

export type SentryStacktrace = Array<{
  file: string;
  line?: number;
  code?: Array<string>;
}>;

export type SentryIssueResponse = {
  title: string;
  file: string;
  sentryUrl: string;
  stacktrace: SentryStacktrace;
};

export async function getSentryIssue(id: string) {
  return (await getIssueById(id))?.data;
}

function getIssueById(id: string): Promise<{ data: SentryIssueResponse }> {
  return get({ path: `/tager/sentry-issue/${id}` });
}
