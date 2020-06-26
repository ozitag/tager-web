import NextI18Next, { InitConfig } from 'next-i18next';

const isServer = typeof window === 'undefined';

export type Lang = 'ru' | 'en';

export const LANGUAGES = {
  RU: 'ru',
  EN: 'en',
} as const;

const DEFAULT_LANGUAGE: Lang = LANGUAGES.RU;
const OTHER_LANGUAGES = Object.values(LANGUAGES).filter(
  (lang) => lang !== DEFAULT_LANGUAGE
);
const LOCALE_SUBPATHS = OTHER_LANGUAGES.reduce(
  (subpaths, lang) => ({ ...subpaths, [lang]: lang }),
  {}
);

/**
 * Detector Options reference:
 * https://github.com/i18next/i18next-http-middleware#detector-options
 */
type DetectorType = 'path' | 'session' | 'querystring' | 'cookie' | 'header';

type DetectorOptions = {
  order?: Array<DetectorType>;
  lookupQuerystring?: string;
  lookupCookie?: string;
  lookupHeader?: string;
  lookupSession?: string;
  lookupPath?: string;
  lookupFromPathIndex?: string;
  caches?: boolean | Array<DetectorType>;
  cookieExpirationDate?: Date;
  cookieDomain?: string;
  cookieSecure?: boolean;
};

type I18NextInitConfig = Omit<
  InitConfig,
  'detection' | 'defaultLanguage' | 'otherLanguages'
> & {
  defaultLanguage: typeof DEFAULT_LANGUAGE;
  otherLanguages: Array<Lang>;
  detection?: DetectorOptions;
};

/**
 * Default config reference:
 * https://github.com/isaachinman/next-i18next/blob/master/src/config/default-config.ts
 */
export const i18nConfig: I18NextInitConfig = {
  defaultLanguage: DEFAULT_LANGUAGE,
  otherLanguages: OTHER_LANGUAGES,
  localeSubpaths: LOCALE_SUBPATHS,
  detection: {
    lookupCookie: 'lng',
    order: ['path', 'cookie', 'header'],
    caches: false,
  },
  browserLanguageDetection: false,
};

const NextI18NextInstance = new NextI18Next(i18nConfig);

export const {
  appWithTranslation,
  Link,
  i18n,
  useTranslation,
} = NextI18NextInstance;

export default NextI18NextInstance;
