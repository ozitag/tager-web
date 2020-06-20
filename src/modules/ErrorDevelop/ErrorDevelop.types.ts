export type SentryIssueResponse = {
  title: string;
  file: string;
  sentryUrl: string;
  stacktrace: Array<{
    file: string;
    line: number;
    code: {
      line: string;
      code: string;
    };
  }>;
};
