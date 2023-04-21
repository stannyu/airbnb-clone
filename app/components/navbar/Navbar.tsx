"use client";

// cs.tui@tui.nl

import React, { useEffect } from "react";
import { SafeUser } from "@/app/types";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div
      className="
      fixed 
      w-full 
      bg-white 5
      z-10 
      shadow-sm
    "
    >
      <div
        className="
        py-4
        border-b-[1px]
      "
      >
        <Container>
          <div
            className="
              flex
              w-full
              flex-row
              items-center
              justify-between
              gap-3
              md:gap-0
            "
          >
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
