import React from "react";
import createCache from "@emotion/cache";
import {
  documentGetInitialProps,
  DocumentHeadTags,
} from "@mui/material-nextjs/v14-pagesRouter";
import { DocumentProps, Head, Html, Main, NextScript } from "next/document";

import { cache } from "@/config/cache";

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: React.ReactElement<any>[];
}

const MyDocument = (props: MyDocumentProps) => {
  return (
    <Html lang="en">
      <Head>
        <meta name="charset" content="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: any) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache: createCache(cache),
  });

  return {
    ...finalProps,
  };
};

export default MyDocument;
