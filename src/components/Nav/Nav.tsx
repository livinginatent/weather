"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {};

const Nav = (props: Props) => {
  const pathname = usePathname(); // Get current pathname for active link styling [^1]
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to check if a link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div
      className={`bg-gradient-to-bl from-sky-500 to-indigo-600 w-screen h-16 flex items-center justify-between px-4 relative z-50`}
    >
      <a href="/" className="text-white text-2xl font-bold">
        Havam.az
      </a>

      <div className="block lg:hidden">
        <button
          className="text-white p-2 rounded-md hover:bg-sky-600 transition-colors"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label={isDropdownOpen ? "Close menu" : "Open menu"}
        >
          {isDropdownOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div
        className={cn(
          "absolute top-16 right-0 w-64 bg-white shadow-lg rounded-b-lg lg:hidden transition-all duration-300 ease-in-out transform origin-top-right z-40",
          isDropdownOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <div className="py-2">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex flex-col w-full">
              {[
                { href: "/", label: "Hava Proqnozu" },
                { href: "/monthly", label: "Aylıq Hava Proqnozu" },
                { href: "/weekly", label: "Həftəlik Hava Proqnozu" },
                { href: "/aqi", label: "Hava Keyfiyyəti" },
                { href: "/blog", label: "Bloq" },
              ].map((item) => (
                <NavigationMenuItem key={item.href} className="w-full">
                  <NavigationMenuLink
                    className={cn(
                      "flex w-full px-4 py-3 text-gray-700 hover:bg-sky-50 hover:text-sky-600 transition-colors",
                      isActive(item.href) &&
                        "bg-sky-100 text-sky-600 font-medium"
                    )}
                    href={item.href}
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="hidden lg:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-4">
            {[
              { href: "/", label: "Hava Proqnozu" },
              { href: "/monthly", label: "Aylıq Hava Proqnozu" },
              { href: "/weekly", label: "Həftəlik Hava Proqnozu" },
              { href: "/aqi", label: "Hava Keyfiyyəti" },
              { href: "/blog", label: "Bloq" },
            ].map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  className={cn(
                    "text-white text-xl font-600 p-2 rounded-sm hover:bg-sky-600/20 transition-colors",
                    isActive(item.href) && "bg-sky-600/30"
                  )}
                  href={item.href}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Nav;
