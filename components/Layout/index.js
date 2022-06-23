import { ReactNode } from "react";
import Head from "next/head";
import Header from "../Header";
import Footer from "../Footer";

export default function Layout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>DeniDev | {pageTitle}</title>
        <meta
          name='description'
          content='portfolio website of deni sugiarto dev'
        />
      </Head>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
