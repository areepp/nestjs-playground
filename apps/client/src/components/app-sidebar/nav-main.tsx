"use client";

import { Route } from "next";
import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useGetMyProfile } from "@/features/profile/api/get-my-profile";
import { useActivePath } from "@/hooks/use-active-paths";
import { buttonVariants } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type TNavItem = {
  title: string;
  iconNumber: string;
  href: Route;
  isProtected: boolean;
};

const NAV_ITEMS: TNavItem[] = [
  {
    title: "Intro",
    iconNumber: "0",
    href: "/",
    isProtected: false,
  },
  {
    title: "Auth",
    iconNumber: "1",
    href: "/auth",
    isProtected: false,
  },
  {
    title: "Basic CRUD",
    iconNumber: "2",
    href: "/posts",
    isProtected: true,
  },
];

export function NavMain() {
  const { isError: isNotLoggedIn } = useGetMyProfile();
  const checkActivePath = useActivePath();
  const { open } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Features</SidebarGroupLabel>
      <SidebarMenu>
        <TooltipProvider delayDuration={0}>
          {NAV_ITEMS.map((item) => {
            const isActive = checkActivePath(item.href);
            const isDisabled = isNotLoggedIn && item.isProtected;

            const commonClasses = cn(
              buttonVariants({
                variant: isActive ? "default" : "ghost",
              }),
              isActive &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              isDisabled && "cursor-not-allowed opacity-50",
            );

            return (
              <SidebarMenuItem key={item.title}>
                {!open ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Link
                        href={isDisabled ? "#" : item.href}
                        className={cn(
                          "mx-auto h-9 w-9",
                          buttonVariants({
                            variant: isActive ? "default" : "ghost",
                            size: "icon",
                          }),
                          isActive &&
                            "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                          isDisabled && "cursor-not-allowed opacity-50",
                        )}
                      >
                        <span className="text-xl font-bold">
                          {item.iconNumber}
                        </span>
                        <span className="sr-only">{item.title}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                ) : (
                  <SidebarMenuButton asChild>
                    <Link
                      href={isDisabled ? "#" : item.href}
                      className={cn(
                        commonClasses,
                        "flex w-full items-center justify-start gap-3",
                      )}
                    >
                      <span className="text-lg font-bold">
                        {item.iconNumber}
                      </span>
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          })}
        </TooltipProvider>
      </SidebarMenu>
    </SidebarGroup>
  );
}
