import "@/styles/globals.css";
import type { AppProps as NextAppProps } from "next/app";

import { websiteConf } from "@/config/website.conf";
import PathProvider from "@/provider/PathProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface AppProps extends NextAppProps {
  locale: string;
}

const App = ({ Component, pageProps, locale }: AppProps) => {
  return (
    <PathProvider basePath={websiteConf.basePath} locale={locale}>
      <Header />
      <main
        style={{
          maxWidth: "1280px",
          minHeight: "80dvh",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Component {...pageProps} />
      </main>
      <Footer />
    </PathProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
App.getInitialProps = async ({ Component, ctx }: any) => {
  const { req } = ctx;
  const locale: string =
    req?.headers?.[websiteConf.cookie.key] ?? websiteConf.i18n.defaultLocale;

  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps({ ...ctx })
    : {};

  return { locale, pageProps };
};

export default App;
