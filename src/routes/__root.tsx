import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/hooks/auth";
import { cn } from "@/lib/utils";
import { LoadingPage } from "@/components/pages/loading-page";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingPage />

  return (
    <React.Fragment>
      <div
        className={cn(
          "flex flex-col justify-start items-start w-full h-full bg-white dark:bg-neutral-950 transition-[padding-top]",
          isAuthenticated ? "pt-16" : "pt-0"
        )}>

        <Navbar />
        <Outlet />
      </div>
    </React.Fragment>
  );
}
