"use client";

import React, { FunctionComponent } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: FunctionComponent<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
      max-w-[320px]
      mx-auto
      xl:px-20
      md:px-10
      sm:px-2
      px-4
    ">
      {children}
    </div>
  );
};

export default Container;
