import { ProjectLogoInverted } from "@/components/miscellaneous/project-logo-inverted";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ThemeToggleAdvanced } from "@/components/ThemeToggleAdvanced";

export const Route = createFileRoute("/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-row justify-start items-start w-full h-full">
      {/* Left side - Auth Forms */}
      <div className="flex flex-col justify-center items-center flex-[0.5] h-full bg-neutral-50 dark:bg-neutral-950">
        <Outlet />
      </div>

      {/* Right side - Hero Section */}
      <div className="relative flex flex-col justify-center items-center flex-[0.5] h-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 overflow-hidden">
        {/* Orange Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.3) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.3) 2px, transparent 2px)
            `,
              backgroundSize: "60px 60px",
              backgroundPosition: "0 0, 30px 30px",
            }}
          ></div>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-white/20 rounded-full blur-sm"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-white/15 rounded-lg blur-sm transform rotate-45"></div>
        <div className="absolute bottom-32 left-32 w-20 h-20 bg-white/10 rounded-full blur-sm"></div>
        <div className="absolute bottom-20 right-20 w-8 h-8 bg-white/25 rounded-lg blur-sm transform -rotate-12"></div>

        {/* Theme Toggle Button - Top Right */}
        <div className="absolute top-6 right-6 z-20">
          <ThemeToggleAdvanced />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-8 max-w-md">
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Organize Your Life
            </h1>
            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              Stay productive and focused with our intuitive todo app. Manage
              tasks, track progress, and achieve your goals.
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-4 text-left">
            <div className="flex items-center text-white/90">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm">Simple and intuitive interface</span>
            </div>
            <div className="flex items-center text-white/90">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm">Real-time synchronization</span>
            </div>
            <div className="flex items-center text-white/90">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm">Priority-based task management</span>
            </div>
          </div>
        </div>

        {/* Project Logo Inverted */}
        <ProjectLogoInverted className="absolute bottom-6 right-6 w-24 h-24" />
      </div>
    </div>
  );
}
