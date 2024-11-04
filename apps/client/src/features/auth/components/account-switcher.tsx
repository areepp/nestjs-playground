"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMyProfile } from "@/features/profile/api/get-my-profile";
import { cn } from "@/lib/cn";
import { ChevronsUpDown, User } from "lucide-react";
import { useState } from "react";
import { useLogout } from "../api/logout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AccountSwitcher({
  isCollapsed,
}: Readonly<{ isCollapsed: boolean }>) {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const { data, isError } = useGetMyProfile({});
  const { mutate: logoutMutation } = useLogout({});

  if (isError) {
    // user is not logged in

    return (
      <Button>
        <Link href="/auth/login">You are not logged in</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "flex cursor-default items-center rounded-lg p-3 transition-colors hover:bg-zinc-200 focus-visible:outline-none dark:hover:bg-zinc-800",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          <div className="flex items-center gap-3">
            <User />
            {!isCollapsed && <span className="text-sm">{data?.name}</span>}
          </div>
          {!isCollapsed && <ChevronsUpDown width={16} height={16} />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          {data?.name}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={() => logoutMutation(undefined)}>
          Log out
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
