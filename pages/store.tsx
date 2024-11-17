import Head from "next/head";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Store() {
  return (
    <>
      <Head>
        <title>Store Page</title>
        <meta name="description" content="Store Page" />
      </Head>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Welcome to Online Store
          </Typography>
        </Box>
      </Container>
    </>
  );
}
