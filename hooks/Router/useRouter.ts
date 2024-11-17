import { NextRouter, useRouter as useNextRouter } from "next/router";
import type { UrlObject } from "url";

import { domainConf } from "@/config/domain.conf";
import { usePathContext } from "@/provider/PathProvider";

type Url = UrlObject | string;

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

export const useRouter = (): NextRouter => {
  const router = useNextRouter();
  const {
    i18n: { defaultLocale, locales },
  } = domainConf;
  const { basePath = "", locale, whiteList = [] } = usePathContext();
  const prefix: string = locale === defaultLocale ? "" : `/${locale}`;
  const isSlash: boolean = router.pathname === "/";

  const onPush = (
    url: Url,
    as?: Url,
    options?: TransitionOptions
  ): Promise<boolean> => {
    if (typeof url === "string") {
      const matchUrl = whiteList.find((path: string) => path === url);
      return router.push(
        matchUrl ? `${prefix}${url}` : `${prefix}${basePath}${url}`,
        as,
        options
      );
    }

    const { pathname } = url;
    const matchUrl = whiteList.find((path: string) => path === pathname);
    return router.push(
      {
        ...url,
        pathname: matchUrl
          ? `${prefix}${pathname}`
          : `${prefix}${basePath}${pathname}`,
      },
      as,
      options
    );
  };

  const onReplace = (
    url: Url,
    as?: Url,
    options?: TransitionOptions
  ): Promise<boolean> => {
    if (typeof url === "string") {
      const matchUrl = whiteList.find((path: string) => path === url);
      return router.replace(
        matchUrl ? `${prefix}${url}` : `${prefix}${basePath}${url}`,
        as,
        options
      );
    }

    const { pathname } = url;
    const matchUrl = whiteList.find((path: string) => path === pathname);
    return router.replace(
      {
        ...url,
        pathname: matchUrl
          ? `${prefix}${pathname}`
          : `${prefix}${basePath}${pathname}`,
      },
      as,
      options
    );
  };

  return {
    ...router,
    basePath,
    defaultLocale,
    pathname: `${prefix}${basePath}${isSlash ? "" : router.pathname}`,
    locale,
    locales,
    push: onPush,
    replace: onReplace,
  };
};
