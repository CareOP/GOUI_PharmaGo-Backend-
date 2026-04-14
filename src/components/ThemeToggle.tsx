import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

export function ThemeToggle() {
  // Destructure 'setTheme' and 'theme' from your context
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      // If your context has toggleTheme, use that. 
      // Otherwise, this logic manually flips it:
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative h-10 w-10"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-teal-600" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-teal-400" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}