import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";

import { AppProps } from "next/dist/next-server/lib/router/router";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
