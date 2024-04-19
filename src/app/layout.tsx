import "@/app/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { Noto_Sans } from "next/font/google";

import { cn } from "@/app/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const noto_sans = Noto_Sans({
  subsets: ["latin"],
  variable: "--noto-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "noto-sans m-0 p-0 h-full w-full overflow-x-hidden bg-[#5c9ce5] antialiased",
         noto_sans.className
        )}
      >
        {children}
      </body>
    </html>
  );
}
