import type { CookieSerializeOptions } from "@/interface/cookie";

type DomainConf = {
  basePath: string;
  i18n: {
    locales: string[];
    defaultLocale: string;
  };
  cookie: {
    key: string;
    options: CookieSerializeOptions;
  };
};

export const domainConf: DomainConf = {
  basePath: "/store",
  i18n: {
    locales: ["au", "at", "ca", "de", "en", "es", "fr", "it", "jp", "kr", "th"],
    defaultLocale: "en",
  },
  cookie: {
    key: "x-store-code",
    options: {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    },
  },
};
