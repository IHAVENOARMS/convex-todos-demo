import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/auth";
import { ThemeToggleAdvanced } from "@/components/ThemeToggleAdvanced";
import { ProjectLogoInverted } from "@/components/miscellaneous/project-logo-inverted";
import { useUserInfo } from "@/hooks/use-user-info";

export function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const { isAuthenticated, signOut } = useAuth();
    const userInfo = useUserInfo();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search functionality here
        console.log("Searching for:", searchQuery);
    };

    const handleLogout = () => {
        void signOut();
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 bg-orange-400 shadow-lg w-full transition-transform duration-300 ease-in-out",
                !isAuthenticated ? "-translate-y-full" : "translate-y-0",
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side - Logo/Brand */}
                    <div className="flex-shrink-0">
                        <ProjectLogoInverted className="h-10 w-auto" />
                    </div>

                    {/* Middle - Search Bar */}
                    <div className="flex-1 max-w-md mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <Input
                                type="text"
                                placeholder="Search todos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-4 bg-white border-gray-300 focus:ring-orange-300 focus:border-orange-300"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </form>
                    </div>

                    {/* Right side - Theme Toggle and User Avatar/Login Button */}
                    <div className="flex items-center gap-3">
                        <ThemeToggleAdvanced />
                        {isAuthenticated ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="w-10 h-10 rounded-full bg-orange-600 hover:bg-orange-700 text-white border-2 border-orange-400"
                                    >
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48 p-2" align="end">
                                    <div className="space-y-2">
                                        <div className="px-3 py-2">
                                            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                                Your Profile
                                            </p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                                {userInfo ? userInfo.email : undefined}
                                            </p>
                                        </div>
                                        <div className="border-t border-neutral-200 dark:border-neutral-700"></div>
                                        <Button
                                            onClick={handleLogout}
                                            variant="ghost"
                                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            Logout
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <Link to="/auth/signin">
                                <Button className="bg-orange-600 hover:bg-orange-700 text-white border-2 border-orange-400">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
