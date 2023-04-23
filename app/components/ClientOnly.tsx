"use client";
import React, { FunctionComponent, useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: FunctionComponent<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState<Boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
