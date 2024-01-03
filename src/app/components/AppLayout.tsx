"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import {
  StyledEngineProvider,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import Footer from "./Footer";
import { theme } from "../../../public/config/theme";

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <UserProvider>
              <body>
                <main className="flex min-h-[100dvh] flex-col items-center justify-between relative">
                  {children}
                  <Footer />
                </main>
              </body>
            </UserProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </AppRouterCacheProvider>
    </html>
  );
};

export default AppLayout;
