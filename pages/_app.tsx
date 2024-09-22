import "@/styles/globals.css";
import { Provider as StoreProvider } from "react-redux";
import { isEmpty } from "lodash-es";
import type { AppProps as NextAppProps } from "next/app";

import { websiteConf } from "@/config/website.conf";
import { withRedux } from "@/provider/StoreProvider";
import { rootReducer } from "@/store";
import { actions as appActions } from "@/store/app";
import PathProvider from "@/provider/PathProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface AppProps extends NextAppProps {
  locale: string;
  reduxStore?: any;
}

const App = ({ Component, pageProps, locale, reduxStore }: AppProps) => {
  return (
    <StoreProvider store={reduxStore}>
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
    </StoreProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }: any) => {
  const { req, reduxStore } = ctx;
  const { dispatch, getState } = reduxStore;
  const state = getState();
  const props = { locale: state.app.locale };

  if (isEmpty(state.app.locale)) {
    const locale: string =
      req?.headers?.[websiteConf.cookie.key] ?? websiteConf.i18n.defaultLocale;
    props.locale = locale;

    await dispatch(
      appActions.setAppConfig({
        locale,
      })
    );
  }

  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps({ ...ctx })
    : {};

  return { locale: props.locale, pageProps };
};

export default withRedux(App, rootReducer);
