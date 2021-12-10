import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ApolloProvider } from "@apollo/client";

import { AppProps } from "next/dist/next-server/lib/router/router";
import { GlobalStyles } from "../components";
import theme from "../theme";

import client from "../apollo-client";

// setup react-query client
const queryClient = new QueryClient();

/**
 * Wrap app in NextAuth & Chakra providers
 */
// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Hydrate state={pageProps.dehydratedState}>
//         <ChakraProvider theme={theme}>
//           <Provider session={pageProps.session}>
//             <GlobalStyles />
//             <Component {...pageProps} />
//           </Provider>
//         </ChakraProvider>
//       </Hydrate>
//     </QueryClientProvider>
//   );
// }

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
