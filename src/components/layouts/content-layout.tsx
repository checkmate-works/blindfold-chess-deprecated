import { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

type ContentLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const ContentLayout = ({ children, title = "" }: ContentLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title={title} />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
