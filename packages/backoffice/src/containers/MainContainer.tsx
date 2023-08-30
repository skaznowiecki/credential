import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      position="absolute"
      bottom="0px"
      mb={3}
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">Sanos Credenciales</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function MainContainer({ children }: any) {
  return (
    <Container component="main" disableGutters maxWidth={false}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {children}
        <Copyright />
      </Box>
    </Container>
  );
}
