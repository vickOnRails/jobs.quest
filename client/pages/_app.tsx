import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { GraphQLClient } from "graphql-request";
import { Hydrate } from "react-query/hydration";
import { ApolloProvider } from "@apollo/client";

import { AppProps } from "next/dist/next-server/lib/router/router";
import { GlobalStyles } from "../components";
import theme from "../theme";

import client from "../apollo-client";

// setup react-query client
const queryClient = new QueryClient();
export const graphqlClient = new GraphQLClient("http://localhost:5000", {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZmNjM2JmMC0yMDRmLTQ3NmEtOGE4Ny1iZmY0OTU1YTZkYjAiLCJlbWFpbCI6InZpY3Rvcm9vZWd1MDAwOUBnbWFpbC5jb20iLCJpYXQiOjE2MzkwNjk0MzgsImV4cCI6MTY0MTY2MTQzOH0.qCU-wpueEmM1jNU6LN4FV5F5NVr4O1IeypBpu_PhLyA`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <Provider session={pageProps.session}>
              <GlobalStyles />
              <Component {...pageProps} />
            </Provider>
          </ChakraProvider>
        </Hydrate>
      </ApolloProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
