import { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

type ContentLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
