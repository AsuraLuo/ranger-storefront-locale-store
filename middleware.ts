import { NextResponse } from "next/server";
import type { NextRequest, NextMiddleware } from "next/server";

import { domainConf } from "@/config/domain.conf";

export const middleware: NextMiddleware = (request: NextRequest) => {
  const {
    basePath,
    i18n: { locales, defaultLocale },
    cookie,
  } = domainConf;
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const localePrefix: string[] = locales.map((locale: string) => {
    const isDefault: boolean = locale === defaultLocale;
    return isDefault ? basePath : `/${locale}${basePath}`;
  });
  const matchStore: string | undefined = localePrefix.find((prefix: string) => {
    const hasSlash: boolean = pathname.startsWith(`${prefix}/`);
    const suffixUrl: string = hasSlash ? `${prefix}/` : prefix;
    return pathname.startsWith(suffixUrl);
  });

  // Match store rewrite store url
  if (matchStore) {
    const locale: string = matchStore.replace(basePath, "");
    const store: string = locale.replace("/", "") || defaultLocale;

    // match store page
    if (pathname == matchStore) {
      url.pathname = pathname.replace(`/${store}`, "");
      const rewriteReponse = NextResponse.rewrite(url);
      rewriteReponse.headers.set(cookie.key, store);
      rewriteReponse.cookies.set(cookie.key, store, {
        ...cookie.options,
      });
      return rewriteReponse;
    } else {
      // match other page
      const isStore: boolean = pathname === `${matchStore}/store`;

      if (!isStore) {
        const resolverParam = url.searchParams.get("resolver");
        url.pathname = pathname.replace(matchStore, "");

        if (resolverParam) {
          url.searchParams.delete("resolver");
        }

        const rewriteReponse = NextResponse.rewrite(url);
        rewriteReponse.headers.set(cookie.key, store);
        rewriteReponse.cookies.set(cookie.key, store, {
          ...cookie.options,
        });
        return rewriteReponse;
      }
    }
  }

  const exsitStore: string = request.headers.get(cookie.key) || "";
  const isDefaultPage: boolean = pathname === "/";
  const matchHome: string | undefined = locales.find((locale: string) => {
    return `/${locale}` === pathname;
  });

  // No match store redirect default store url
  if (!exsitStore) {
    if (isDefaultPage) {
      const response: NextResponse = NextResponse.next();
      response.headers.set(cookie.key, defaultLocale);
      response.cookies.set(cookie.key, defaultLocale, {
        ...cookie.options,
      });
      return response;
    }

    if (matchHome) {
      url.pathname = pathname.replace(matchHome, "");
      const rewriteReponse = NextResponse.rewrite(url);
      rewriteReponse.headers.set(cookie.key, matchHome);
      rewriteReponse.cookies.set(cookie.key, matchHome, {
        ...cookie.options,
      });
      return rewriteReponse;
    }
  }
};

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|sitemap.xml|robots.txt|manifest.json).*)",
};
