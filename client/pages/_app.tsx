import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { GraphQLClient } from "graphql-request";
import { Hydrate } from "react-query/hydration";

import { AppProps } from "next/dist/next-server/lib/router/router";
import { GlobalStyles } from "../components";
import theme from "../theme";

const graphqlEndpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;
// setup react-query client
const queryClient = new QueryClient();
export const graphqlClient = new GraphQLClient(graphqlEndpoint, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  },
});

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
