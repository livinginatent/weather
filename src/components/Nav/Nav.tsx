"use client";

import { usePathname } from "next/navigation";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

type Props = {};

const Nav = (props: Props) => {
  const pathname = usePathname();
  console.log(pathname);

  const navBarPosition = pathname === "/aqi" ? "" : "fixed top-0 z-1";
  return (
    <div
      className={`bg-gradient-to-bl ${navBarPosition} from-sky-500 to-indigo-600 w-screen h-16 flex items-center justify-between px-4`}
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-xl font-600  p-2 rounded-sm"
              href="/"
            >
              Əsas
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/*        <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-xl font-600  p-2 rounded-sm"
              href="/calendar"
            >
              Təqvim
            </NavigationMenuLink>
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-xl font-600  p-2 rounded-sm"
              href="/aqi"
            >
              Hava Keyfiyyəti
            </NavigationMenuLink>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <NavigationMenuLink
              className="bg-white p-2 border-2 rounded-sm"
              href="https://github.com/radix-ui"
            >
              Əlaqə
            </NavigationMenuLink>
          </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Nav;
