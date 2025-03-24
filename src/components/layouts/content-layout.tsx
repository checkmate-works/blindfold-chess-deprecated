import { ReactNode } from "react";
import { Header } from "./header";
import React from "react";

type ContentLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const ContentLayout = ({ children, title = "" }: ContentLayoutProps) => {
  return (
    <React.Fragment>
      <Header title={title} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-8">
        {children}
      </div>
    </React.Fragment>
  );
};
