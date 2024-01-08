import Head from "next/head";
import Header from "../section/Header";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("../section/Footer"));

export default function Layout({ children, activeNavbar }) {
  return (
    <>
      <Header activeNavbar={activeNavbar} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
