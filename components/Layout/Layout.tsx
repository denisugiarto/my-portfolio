import dynamic from "next/dynamic";
import Header, { ActiveNavbarType } from "./Header";

const Footer = dynamic(() => import("./Footer"));

type LayoutProps = {
  children: React.ReactNode;
  activeNavbar?: ActiveNavbarType;
};

export const Layout = ({ children, activeNavbar }: LayoutProps) => {
  return (
    <>
      <Header activeNavbar={activeNavbar} />
      <main className="min-h-[calc(100dvh-56px)]">{children}</main>
      <Footer />
    </>
  );
};
