import { createLinkComponent } from '@tager/web-components';
/** i18n:enabled */
import { Link as I18nLink } from '@/i18n';
const Link = createLinkComponent({ nextLinkComponent: I18nLink });
/** i18n:enabled:end */

/** i18n:disabled */
// const Link = createLinkComponent();
/** i18n:disabled:end */

export default Link;
