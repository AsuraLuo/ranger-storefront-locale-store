import Link from "@/components/Link";

const Header = () => {
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
          <Link href="/cart">
            <span>Cart Page</span>
          </Link>
          <Link href="/checkout">
            <span>Checkout Page</span>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
