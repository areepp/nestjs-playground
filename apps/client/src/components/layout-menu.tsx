"use client";

import { getCookie, setCookie } from "cookies-next";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AccountSwitcher } from "@/features/auth/components/account-switcher";
import { useState } from "react";

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
        collapsedSize={4}
        onCollapse={() => {
          console.log("collapse true");
          setIsCollapsed(true);
          setCookie("layoutMenuCollapsed", true);
        }}
        onResize={() => {
          console.log("collapse false");

          setIsCollapsed(false);
          setCookie("layoutMenuCollapsed", false);
        }}
        className="flex flex-col p-3"
      >
        <div className="flex h-full flex-1 flex-col items-center justify-center p-6"></div>

        <AccountSwitcher isCollapsed={isCollapsed} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>{children}</ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default LayoutMenu;
