"use client";

import React, { FunctionComponent, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected: boolean;
}

const CategoryBox: FunctionComponent<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleCategoryClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const uptadedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete uptadedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: uptadedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleCategoryClick}
      className={`flex flex-com items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-600 transition cursor-pointer 
          ${selected ? "border-b-neutral-800" : "border-transparent"} 
          ${selected ? "text-neutral-800" : "text-neutral-500"}
      }`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
