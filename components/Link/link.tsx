import NextLink from "next/link";
import type { LinkProps } from "next/link";

import { domainConf } from "@/config/domain.conf";
import { usePathContext } from "@/provider/PathProvider";

const Link: React.FC<LinkProps & { children: React.ReactNode }> = ({
  children,
  href = "",
  prefetch = false,
  ...props
}) => {
  const { basePath, locale = "", whiteList = [] } = usePathContext();
  const prefix: string =
    locale === domainConf.i18n.defaultLocale ? "" : `/${locale}`;
  const matchUrl = whiteList.find((path: string) => path === href);

  return (
    <NextLink
      href={matchUrl ? `${prefix}${href}` : `${prefix}${basePath}${href}`}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
