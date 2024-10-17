"use client";

import { getCookie, setCookie } from "cookies-next";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AccountSwitcher } from "@/features/auth/components/account-switcher";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/cn";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const NAV_LINKS: {
  title: string;
  iconNumber: string;
  href: string;
}[] = [
  {
    title: "Intro",
    iconNumber: "0",
    href: "/",
  },
  {
    title: "Auth",
    iconNumber: "1",
    href: "/auth",
  },
  {
    title: "Basic CRUD",
    iconNumber: "2",
    href: "/posts",
  },
];

const NavLinks = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const pathname = usePathname();

  return (
    <TooltipProvider delayDuration={0}>
      <div
        data-collapsed={isCollapsed}
        className="group mt-3 flex h-full flex-1 flex-col items-center gap-4"
      >
        <nav className="flex w-full flex-col gap-1">
          {NAV_LINKS.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({
                        variant: pathname === link.href ? "default" : "ghost",
                        size: "icon",
                      }),
                      "mx-auto h-9 w-9",
                      pathname === link.href &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    )}
                  >
                    <span className="text-xl font-bold">{link.iconNumber}</span>
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: pathname === link.href ? "default" : "ghost",
                  }),
                  pathname === link.href &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "flex w-full items-center justify-start gap-3",
                )}
              >
                <span className="text-lg font-bold">{link.iconNumber}</span>
                {link.title}
              </Link>
            ),
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
};

const LayoutMenu = ({ children }: { children: React.ReactNode }) => {
  const collapsedCookie = getCookie("layoutMenuCollapsed");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    collapsedCookie ? JSON.parse(collapsedCookie) : false,
  );

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="h-screen min-h-screen w-screen rounded-lg border"
    >
      <ResizablePanel
        maxSize={15}
        defaultSize={15}
        minSize={10}
        collapsible
        collapsedSize={3}
        onCollapse={() => {
          setIsCollapsed(true);
          setCookie("layoutMenuCollapsed", true);
        }}
        onResize={() => {
          setIsCollapsed(false);
          setCookie("layoutMenuCollapsed", false);
        }}
        className="flex flex-col p-3"
      >
        <NavLinks isCollapsed={isCollapsed} />
        <AccountSwitcher isCollapsed={isCollapsed} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default LayoutMenu;
