import "@/app/styles/globals.css";

import { Mulish } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { cn } from "@/lib/utils";



const mulish = Mulish({ subsets: ["latin"] });

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
          "noto-sans m-0 p-0 h-screen w-full overflow-x-hidden bg-gradient-to-tr from-sky-500 to-indigo-600 antialiased"
        )}
      >
        <GoogleTagManager gtmId="G-64H88GM53T" />
        <main className={mulish.className}>{children}</main>
      </body>
    </html>
  );
}
