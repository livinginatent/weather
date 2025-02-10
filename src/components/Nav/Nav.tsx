"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

type Props = {};

const Nav = (props: Props) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className={`bg-gradient-to-bl from-sky-500 to-indigo-600 w-screen h-16 flex items-center justify-between px-4`}
    >
      <a href="/" className="text-white text-2xl font-bold">
        Havam.az
      </a>

      <div className="block lg:hidden">
        <button
          className="text-white text-xl"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          ☰
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isDropdownOpen && (
        <div className="absolute top-16 rounded-sm right-0 w-48 bg-gradient-to-bl from-sky-500 to-indigo-600 lg:hidden">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col items-center">
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="text-white text-xl font-600 p-4 w-full text-center"
                  href="/"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Hava Proqnozu
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="text-white text-xl font-600 p-4 w-full text-center"
                  href="/monthly"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Aylıq Hava Proqnozu
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="text-white text-xl font-600 p-4 w-full text-center"
                  href="/aqi"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Hava Keyfiyyəti
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="text-white text-xl font-600 p-4 w-full text-center"
                  href="/namaz"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Namaz Vaxtları
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="text-white text-xl font-600 p-4 w-full text-center"
                  href="/blog"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  Bloq
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}

      <div className="hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-white text-xl font-600 p-2 rounded-sm"
                href="/"
              >
                Hava Proqnozu
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-white text-xl font-600 p-4 w-full text-center"
                href="/monthly"
                onClick={() => setIsDropdownOpen(false)}
              >
                Aylıq Hava Proqnozu
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-white text-xl font-600 p-2 rounded-sm"
                href="/aqi"
              >
                Hava Keyfiyyəti
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-white text-xl font-600 p-4 w-full text-center"
                href="/namaz"
                onClick={() => setIsDropdownOpen(false)}
              >
                Namaz vaxtları
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-white text-xl font-600 p-2 rounded-sm"
                href="/blog"
              >
                Bloq
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Nav;
