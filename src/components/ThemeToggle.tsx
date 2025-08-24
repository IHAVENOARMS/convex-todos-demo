import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/stores/theme";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme, getEffectiveTheme } = useThemeStore();
    const effectiveTheme = getEffectiveTheme();

    const cycleTheme = () => {
        const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    return (
        <Button
            onClick={cycleTheme}
            size="icon"
            variant="ghost"
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
            title={`Current theme: ${theme} (${effectiveTheme})`}
        >
            {effectiveTheme === 'dark' ? (
                // Sun icon for dark mode
                <Sun className="w-5 h-5" />
            ) : (
                // Moon icon for light mode
                <Moon className="w-5 h-5" />
            )}
        </Button>
    );
} 