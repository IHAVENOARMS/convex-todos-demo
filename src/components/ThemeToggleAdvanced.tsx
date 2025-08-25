import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useSaveUserPreferences,
  useUserPreferences,
} from "@/hooks/user-preferences";
import { Theme, useThemeStore } from "@/stores/theme";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect } from "react";

export function ThemeToggleAdvanced() {
  const userPreferences = useUserPreferences();
  const saveUserPreferences = useSaveUserPreferences();

  const { getEffectiveTheme, setTheme, theme } = useThemeStore();
  const effectiveTheme = getEffectiveTheme();

  const themes = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
    { value: "system" as const, label: "System", icon: Monitor },
  ];
  useEffect(() => {
    if (!userPreferences) return;
    setTheme(userPreferences.theme as Theme);
  }, [userPreferences]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
          title={`Current theme: ${theme} (${effectiveTheme})`}
        >
          {effectiveTheme === "dark" ? (
            // Sun icon for dark mode
            <Sun className="w-5 h-5" />
          ) : (
            // Moon icon for light mode
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 px-2 py-1">
            Theme
          </p>
          {themes.map((themeOption) => {
            const IconComponent = themeOption.icon;
            return (
              <Button
                key={themeOption.value}
                onClick={() => {
                  if (!userPreferences) {
                    setTheme(themeOption.value);
                    return;
                  }
                  void saveUserPreferences({
                    preferences: { theme: themeOption.value },
                  });
                }}
                variant={theme === themeOption.value ? "default" : "ghost"}
                className="w-full justify-start text-sm"
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {themeOption.label}
                {themeOption.value === "system" && (
                  <span className="ml-auto text-xs text-gray-500">
                    ({effectiveTheme})
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
