import React from 'react';

import { Head } from 'next/document';

class HeadCustom extends Head {
  // https://github.com/zeit/next.js/blob/d467e040d51ce1f8d2bf050d729677b6dd99cb96/packages/next/pages/_document.tsx#L187
  getCssLinks() {
    const { assetPrefix, files } = this.context._documentProps;
    const cssFiles =
      files && files.length ? files.filter((f) => /\.css$/.test(f)) : [];

    const cssLinkElements: any[] = [];

    cssFiles.forEach((file) => {
      cssLinkElements.push(
        <link
          key={file}
          nonce={this.props.nonce}
          rel="stylesheet"
          href={`${assetPrefix}/_next/${encodeURI(file)}`}
          crossOrigin={this.props.crossOrigin}
        />
      );
    });

    return cssLinkElements.length === 0 ? null : cssLinkElements;
  }

  getPreloadMainLinks() {
    return [];
  }

  getPreloadDynamicChunks() {
    return [];
  }
}

export default HeadCustom;
