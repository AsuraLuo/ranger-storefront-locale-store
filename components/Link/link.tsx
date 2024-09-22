import NextLink from "next/link";
import type { LinkProps } from "next/link";

import { websiteConf } from "@/config/website.conf";
import { usePathContext } from "@/provider/PathProvider";

const Link: React.FC<LinkProps & { children: React.ReactNode }> = ({
  children,
  href = "",
  prefetch = false,
  ...props
}) => {
  const { basePath, locale = "" } = usePathContext();
  const prefix: string =
    locale === websiteConf.i18n.defaultLocale ? "" : `/${locale}`;

  return (
    <NextLink
      href={`${prefix}${basePath}${href}`}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default Link;
