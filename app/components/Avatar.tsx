"use client";

import React, { FunctionComponent, useEffect } from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar: FunctionComponent<AvatarProps> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      width="30"
      height="30"
      alt="Avatar"
      src={src || "/images/placeholder.jpeg"}
    />
  );
};

export default Avatar;
