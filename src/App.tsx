import { FC } from "react";
import Router from "./router/Router";
import Header from "./components/Header";
import { Box, Container } from "@mui/material";

const App: FC = () => {
  return (
    <Container
      sx={{
        maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "1200px" },
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh)",
      }}
    >
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Router />
      </Box>
    </Container>
  );
};

export default App;
