import Head from "next/head";
import { Provider as StoreProvider } from "react-redux";
import { isEmpty } from "lodash-es";
import type { AppProps, AppContext } from "next/app";

import { domainConf } from "@/config/domain.conf";
import { withRedux } from "@/provider/StoreProvider";
import { rootReducer } from "@/store";
import { actions as appActions } from "@/store/app";
import PathProvider from "@/provider/PathProvider";
import EmotionRegistry from "@/lib/emotion/registry";
import { cache } from "@/config/cache";
import { emotionTheme } from "@/config/emotion";
import { muiTheme } from "@/config/mui";
import GlobalStyled from "@/components/GlobalStyled";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PageProps extends AppProps {
  locale: string;
  reduxStore?: any;
}

const App = ({ Component, pageProps, locale, reduxStore }: PageProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StoreProvider store={reduxStore}>
        <PathProvider
          basePath={domainConf.basePath}
          locale={locale}
          whiteList={domainConf.whiteList}
        >
          <EmotionRegistry
            cacheOptions={cache}
            muiTheme={muiTheme}
            emotionTheme={emotionTheme}
          >
            <GlobalStyled />
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
          </EmotionRegistry>
        </PathProvider>
      </StoreProvider>
    </>
  );
};

interface PageContext extends Omit<AppContext, "ctx"> {
  ctx: AppContext["ctx"] & {
    reduxStore: any;
  };
}

App.getInitialProps = async ({ Component, ctx }: PageContext) => {
  const { req, reduxStore } = ctx;
  const { dispatch, getState } = reduxStore;
  const state = getState();
  const props = { locale: state.app.locale };

  if (isEmpty(state.app.locale)) {
    const locale: string =
      (req?.headers?.[domainConf.cookie.key] as string) ??
      domainConf.i18n.defaultLocale;
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
