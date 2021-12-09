import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

import { AppProps } from "next/dist/next-server/lib/router/router";
import { GlobalStyles } from "../components";
import theme from "../theme";

// setup react-query client
const queryClient = new QueryClient();

/**
 * Wrap app in NextAuth & Chakra providers
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <Provider session={pageProps.session}>
            <GlobalStyles />
            <Component {...pageProps} />
          </Provider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
