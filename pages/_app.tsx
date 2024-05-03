import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from '@apollo/client'
import client from "@/config/apollo";

import PedidoState from "@/context/PedidoState";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <PedidoState>
        <Component {...pageProps} />
      </PedidoState>
    </ApolloProvider>
  )
}
