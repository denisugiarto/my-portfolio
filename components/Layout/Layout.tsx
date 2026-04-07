import BackToTopButton from "@/components/ui/back-to-top-button";
import Footer from "./Footer";
import Header, { HeaderProps } from "./Header";

type LayoutProps = {
  children: React.ReactNode;
} & HeaderProps;

export const Layout = ({ children, ...headerProps }: LayoutProps) => {
  return (
    <>
      <Header {...headerProps} />
      <main id="main-content" className="min-h-[calc(100dvh-56px)]">
        {children}
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
};
