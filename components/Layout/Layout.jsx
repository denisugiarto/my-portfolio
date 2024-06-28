import dynamic from "next/dynamic";
import Header from "./Header";

const Footer = dynamic(() => import("./Footer"));

export const Layout = ({ children, activeNavbar }) => {
  return (
    <>
      <Header activeNavbar={activeNavbar} />
      <main className="min-h-[calc(100dvh-56px)]">{children}</main>
      <Footer />
    </>
  );
};
