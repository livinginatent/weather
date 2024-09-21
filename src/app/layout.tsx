import "@/app/styles/globals.css";

import { Mulish } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { cn } from "@/lib/utils";
import Nav from "@/components/Nav/Nav";

const mulish = Mulish({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="AiTKc0Y6143pH0fcu062C9n_f3gvdRVGLSrW6g3xE2k"
        />
      </head>

      <body className={cn("noto-sans m-0 p-0  bg-[#e4f1ff] antialiased")}>
        <GoogleAnalytics gaId="G-64H88GM53T" />
        <main className={`${mulish.className} `}>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
