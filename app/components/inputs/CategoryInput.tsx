"use client";

import React from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  icon: IconType;
  label: string;
  selected: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  icon: Icon,
  label,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col rounded-xl p-4 border-2 gap-3 hover:border-black transition cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
