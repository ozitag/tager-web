const STORYBOOK_BASE_PATH_FALLBACK = '/storybook';
const STORYBOOK_BASE_PATH =
  process.env.NEXT_PUBLIC_STORYBOOK_BASE_PATH || STORYBOOK_BASE_PATH_FALLBACK;

const STORYBOOK_REWRITE = {
  source: `${STORYBOOK_BASE_PATH}/:slug*`,
  destination: `/api/storybook?path=${STORYBOOK_BASE_PATH}/:slug*`,
};

const STORYBOOK_REDIRECT = {
  source: STORYBOOK_BASE_PATH,
  destination: `${STORYBOOK_BASE_PATH}/index.html`,
  permanent: true,
};

module.exports = {
  STORYBOOK_REWRITE,
  STORYBOOK_REDIRECT,
};
