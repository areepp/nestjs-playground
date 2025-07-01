import { AppSidebar } from "./app-sidebar";
import { DarkModeToggle } from "./dark-mode-toggle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";

const LayoutMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="absolute left-3 top-3" />
        <div className="fixed right-3 top-3">
          <DarkModeToggle />
        </div>
        <main className="h-full container max-w-xl mx-auto py-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutMenu;
