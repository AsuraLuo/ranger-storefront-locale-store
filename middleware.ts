import { NextResponse } from "next/server";
import type { NextRequest, NextMiddleware } from "next/server";

import { websiteConf } from "@/config/website.conf";

export const middleware: NextMiddleware = (request: NextRequest) => {
  const {
    basePath,
    i18n: { locales, defaultLocale },
    cookie,
  } = websiteConf;
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
    url.pathname = pathname.replace(matchStore, "");

    const rewriteReponse = NextResponse.rewrite(url);
    rewriteReponse.headers.set(cookie.key, store);
    // Set cookie sub path
    rewriteReponse.cookies.set(cookie.key, store, {
      ...cookie.options,
      path: matchStore,
    });
    return rewriteReponse;
  }

  const exsitStore: string = request.headers.get(cookie.key) || "";
  const isHomePage: boolean = pathname === "/";

  // No match store redirect default store url
  if (!pathname.startsWith(basePath) && !exsitStore) {
    url.pathname = url.pathname.replace(
      "/",
      isHomePage ? basePath : `${basePath}/`
    );
    const redirectResponse = NextResponse.redirect(url);
    return redirectResponse;
  }
};

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|sitemap.xml|robots.txt|manifest.json).*)",
};
