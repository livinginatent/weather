import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";

type Props = {};

const Nav = (props: Props) => {
  return (
    <div className="bg-gradient-to-br from-sky-500 to-indigo-600 w-screen h-16 flex items-center justify-between px-4">
      <NavigationMenu >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="bg-white p-2 border-2 rounded-sm"
              href="/"
            >
              Əsas
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="bg-white p-2 border-2 rounded-sm"
              href="/calendar"
            >
              Təqvim
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
