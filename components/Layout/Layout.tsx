import dynamic from "next/dynamic";
import Header, { HeaderProps } from "./Header";

const Footer = dynamic(() => import("./Footer"));

type LayoutProps = {
  children: React.ReactNode;
} & HeaderProps;

export const Layout = ({ children, ...headerProps }: LayoutProps) => {
  return (
    <>
      <Header {...headerProps} />
      <main className="min-h-[calc(100dvh-56px)]">{children}</main>
      <Footer />
    </>
  );
};
