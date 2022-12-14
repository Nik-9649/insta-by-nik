import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <>
          <Head>
            <title>Insta by nik</title>
            <link rel="icon" href="https://links.papareact.com/jjm" />
          </Head>
          <Component {...pageProps} />
        </>
      </RecoilRoot>
    </SessionProvider>
  );
}
