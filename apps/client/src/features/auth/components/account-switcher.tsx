"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/cn";
import { ChevronsUpDown, User } from "lucide-react";
import { useState } from "react";

export function AccountSwitcher({
  isCollapsed,
}: Readonly<{ isCollapsed: boolean }>) {
  const [showStatusBar, setShowStatusBar] = useState(true);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "flex cursor-default items-center rounded-full p-3 transition-colors hover:bg-zinc-200 focus-visible:outline-none dark:hover:bg-zinc-800",
            isCollapsed ? "justify-center" : "justify-between",
          )}
        >
          <div className="flex items-center gap-3">
            <User />
            {!isCollapsed && <span className="text-sm">John Doe</span>}
          </div>
          {!isCollapsed && <ChevronsUpDown width={16} height={16} />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          John Doe
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem disabled>Log out</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
