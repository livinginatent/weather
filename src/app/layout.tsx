import "@/app/styles/globals.css";

import { Mulish } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav/Nav";
import { Analytics } from "@vercel/analytics/react";
const mulish = Mulish({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="google-site-verification"
          content="AiTKc0Y6143pH0fcu062C9n_f3gvdRVGLSrW6g3xE2k"
        />
      </head>

      <body
        className={cn("noto-sans m-0 p-0  h-screen   bg-[#e4f1ff] antialiased")}
      >
        <GoogleAnalytics gaId="G-64H88GM53T" />
        <main className={`${mulish.className} h-full`}>
          <Nav />
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}
