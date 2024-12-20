import type { Metadata } from "next";
import localFont from "next/font/local";
import { DarkModeToggle } from "@/components/dark-mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Providers from "./provider";
import LayoutMenu from "../components/layout-menu";

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans text-xl antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <LayoutMenu>
              <div className="fixed right-3 top-3">
                <DarkModeToggle />
              </div>
              <main className="h-full container max-w-xl mx-auto py-6">
                {children}
              </main>
            </LayoutMenu>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
