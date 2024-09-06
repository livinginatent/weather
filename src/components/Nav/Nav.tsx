import React from "react";
import {
  NavigationMenu,
 
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
 
} from "@/components/ui/navigation-menu";

type Props = {};

const Nav = (props: Props) => {
  return (
    <div className="bg-gradient-to-bl from-sky-500 to-indigo-600 w-screen h-16 flex items-center justify-between px-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-xl font-600 underline decoration-solid p-2 rounded-sm"
              href="/"
            >
              Əsas
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="text-white text-xl font-600 underline decoration-solid p-2 rounded-sm"
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