"use client";

import { Feather } from "lucide-react";
import * as React from "react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function ProjectTitle() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-3">
        <div className="flex aspect-square size-8 items-center justify-center rounded bg-sidebar-primary text-sidebar-primary-foreground">
          <Feather />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">NestJS Playground</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
