type ConfigType = Readonly<{
  redirectMap: Map<string, string>;
}>;

/**
 * Example:
 *
 * const CONFIG: ConfigType = {
 *    redirectMap: new Map([
 *      ['/page/about', '/about'],
 *      ['/page/rules', '/rules'],
 *      ['/page/terms', '/terms'],
 *    ]),
 *  };
 */
const CONFIG: ConfigType = {
  redirectMap: new Map([]),
};

export default CONFIG;
