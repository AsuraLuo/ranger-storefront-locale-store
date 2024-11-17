import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

import { useRouter } from "@/hooks/Router";
import { domainConf } from "@/config/domain.conf";
import Link from "@/components/Link";

const Header = () => {
  const {
    i18n: { locales, defaultLocale },
  } = domainConf;
  const router = useRouter();
  const locale = useSelector((state: any) => state.app.locale);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prefix: string =
      e.target.value === defaultLocale ? "" : e.target.value;
    window.location.href = `${window.location.origin}/${prefix}`;
  };

  const handleOnClick = () => {
    router.push("/login", undefined, { shallow: true });
  };

  return (
    <header>
      <div
        style={{
          maxWidth: "1280px",
          display: "flex",
          margin: "0 auto",
          padding: "20px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridColumnGap: "30px",
          }}
        >
          <Link href="/">
            <span>Home Page</span>
          </Link>
          <Link href="/store">
            <span>Store Page</span>
          </Link>
          <Link href="/cart">
            <span>Cart Page</span>
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridColumnGap: "30px",
          }}
        >
          <Link href="/login">
            <span>Login Page</span>
          </Link>
          <Link href="/register">
            <span>Register Page</span>
          </Link>
          <Link href="/test-product?id=308467">
            <span>Product Page</span>
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridColumnGap: "10px",
            alignItems: "center",
          }}
        >
          <Button variant="contained" onClick={handleOnClick}>
            Jump Login
          </Button>
          <span>Toggle Store:</span>
          {locales.length > 0 && (
            <select
              style={{ padding: "5px" }}
              value={locale}
              onChange={handleOnChange}
            >
              {locales.map((locale: string) => {
                return (
                  <option key={locale} value={locale}>
                    {locale}
                  </option>
                );
              })}
            </select>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
