import { stringify, parse } from 'query-string';
import { isBrowser, isResSent } from './common';

// TODO: replace "query-string" by some native implementation

/**
 * Source: https://github.com/zeit/next.js/issues/649#issuecomment-426552156
 * Alternative: https://github.com/zeit/next.js/wiki/Redirecting-in-%60getInitialProps%60
 */
export function redirect(params) {
  const { Router, ctx = {}, location, status = 302 } = params;

  const query = isBrowser()
    ? document.location.search
    : ctx.req && Object.keys(ctx.req.query).length > 0
    ? `?${stringify(ctx.req.query, { encode: false })}`
    : null;

  const finalLocation = query ? location + query : location;

  if (ctx.res && !isResSent(ctx.res)) {
    // Add the content-type for SEO considerations
    ctx.res.setHeader('Content-Type', 'text/html; charset=utf-8');
    ctx.res.setHeader('Location', finalLocation);
    ctx.res.statusCode = status;
    ctx.res.end();
  } else {
    Router.replace({
      pathname: location,
      query: parse(query),
    });
  }
}
