# Next.js starter by (OZiTAG)

## How to start new project from this starter
Usually you already have empty repository (maybe with README.md file) and you need to put this starter in new repo.
1. Clone repository of your new project
2. Go to Next.js starter repo and download zip archive of code.
 Or you can download zip by this link:
  `https://gitlab.com/ozitag/internal-projects/nextjs-starter/-/archive/master/nextjs-starter-master.zip`
3. Unzip archive and past content of starter into your project local folder
4. Commit changes. Done :) 

## How to run
* `yarn start` - starts app in dev mode
* `yarn build` - creates production build
* `yarn server` - run local server with production build
* `yarn storybook` - starts storybook app in dev mode
* `yarn build-storybook` - creates production build of storybook app

## Folder structure
### 1) `/storybook`

`/.storybook` - storybook staff

`/.storybook/main.js` - here you can tweak storybook settings (e.g. webpack config)  
[**Reference - Custom Webpack Config**](https://storybook.js.org/docs/configurations/custom-webpack-config/)

`/.storybook/preview.js` - here you can import some scripts or styles from app 
and these files will be included in storybook build  

`/.storybook/preview-head.html` - here you can populate `<head>` tag of storybook html.
 It's useful for google fonts or different public scripts.

[**Reference - Add Custom Head Tags**](https://storybook.js.org/docs/configurations/add-custom-head-tags/)
 
### 2) `/config`
 `/config` - folder for different app configs or util functions, which are needed in `next.config.js`
 
 `/config/env.js` - here we grab all env variables from `.env` file
 
 `/config/paths.js` - this file has function, which parses `tsconfig.json` and and get webpack path aliases.
  It's necessary because webpack should understand imports with paths like `@components/*` 

### 3) `/public`
Here you can store different public files, like favicon or public scripts. 

[**Reference - Static File Serving**](https://nextjs.org/docs/basic-features/static-file-serving)
  
### 4) `/src`
Here we store all app files. It's handy to configure prettier watch whole this folder (TS and TSX extensions)

#### `/src/assets` - folder for assets (images, icons, styles and etc.)
 
 `/src/assets/css` - folder for `css` files. It contains `index.css` file where you can import all other global css files.
  To import assets from a `node_modules` path, prefix it with a `~`:

 ```css
 @import "~normalize.css";
 @import "~nprogress/nprogress.css";
 
 @import "./global.css";
 @import "./fonts.css";
```
[**Reference to `css-loader`**](https://github.com/webpack-contrib/css-loader#import)

`global.css` contains css reset and default styles like `font-family` and `font-size`

`/src/assets/fonts` - for local fonts

`/src/assets/images` - for images with extensions: `.bmp`, `.gif`, `.jpe?g`, `.png`, `.webp`

`/src/assets/svg` - for svg icons.
You can import svg as React Component:
```js
import { ReactComponent as UserIcon } from '@assets/svg/icon_name.svg';
```
or just get public url of icon:
```js
import userIconSrc from '@assets/svg/icon_name.svg';
```
[**Reference in @svgr/webpack**](https://react-svgr.com/docs/webpack/#using-with-url-loader-or-file-loader)

#### `/src/components` - shared components
 * `Image` - img decorator with support of lazy-loading
 * `Layout` - contains root layout of page with `header`, `footer` and `main` block
 * `Page` - we use this component to specify title and meta tags of page
 * `ContentContainer` - may be useful to restrict content width
 * `Link` - wrapper of `Next/Link`. Please use this component instead of `Next/Link` component
 
[**Reference - next/link**](https://nextjs.org/docs/api-reference/next/link)
 
#### `/src/constants` - constants :)
Usually has 2 files: `theme.ts` - for style constants like colors, fonts and etc, and `common.ts` - for other cases

#### `/src/hocs` - for High Order Components
Usually we store wrapper of `Next/App` component.
 It's can be handy to store redux wrapper here (`withRedux`) and auth wrapper (`withAuth`)
 
 #### `/src/hooks` - for shared hooks
 #### `/src/modules` - for components which contains whole page
 #### `/src/pages` - for Next.js pages
 **References:**
 * [Pages](https://nextjs.org/docs/basic-features/pages)
 * [`src` Directory](https://nextjs.org/docs/advanced-features/src-directory)
 * [Custom `App`](https://nextjs.org/docs/advanced-features/custom-app)
 * [Custom `Document`](https://nextjs.org/docs/advanced-features/custom-document)
 * [Custom Error Page](https://nextjs.org/docs/advanced-features/custom-error-page)

#### `/src/polyfills` - contains only one file `index.js` where you can write and import polyfills

#### `/src/services` - for API services and requests
#### `/src/store` - for redux staff
#### `/src/typings` - TypeScript types only!
#### `/src/utils` - utils :)




