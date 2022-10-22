import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <>
        <Head>
          <title>Insta by nik</title>
          <link rel="icon" href="https://links.papareact.com/jjm" />
        </Head>
        <Component {...pageProps} />
      </>
    </SessionProvider>
  );
}
