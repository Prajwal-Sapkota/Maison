import * as React from "react"
import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [showMenu, setShowMenu] = React.useState(false)
  
  const isDark = theme === "dark" || 
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  React.useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = () => closeMenu()
    if (showMenu) {
      window.addEventListener('click', handleClickOutside)
      return () => window.removeEventListener('click', handleClickOutside)
    }
  }, [showMenu])

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event from bubbling
    setTheme(newTheme)
    closeMenu()
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleMenu()
        }}
        className="p-2 rounded-full focus:outline-none transition-all duration-300 hover:bg-muted"
        aria-label="Toggle theme"
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <i 
            className={`ri-sun-line text-xl absolute transition-all duration-300 theme-toggle-icon ${
              isDark 
                ? "opacity-100 rotate-0 scale-100" 
                : "opacity-0 rotate-90 scale-50"
            }`} 
          />
          <i 
            className={`ri-moon-line text-xl absolute transition-all duration-300 theme-toggle-icon ${
              !isDark 
                ? "opacity-100 rotate-0 scale-100" 
                : "opacity-0 rotate-90 scale-50"
            }`} 
          />
        </div>
      </button>

      {showMenu && (
        <div 
          className="absolute right-0 mt-2 w-40 py-2 bg-card rounded-md shadow-lg border border-border elevated z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-4 py-1 text-xs uppercase text-muted-foreground font-medium">
            Appearance
          </div>
          <button
            onClick={handleThemeChange("light")}
            className={`flex items-center w-full px-4 py-2 text-sm hover:bg-muted ${theme === "light" ? "text-accent font-medium" : ""}`}
          >
            <i className="ri-sun-line mr-2"></i>
            Light
            {theme === "light" && <i className="ri-check-line ml-auto"></i>}
          </button>
          <button
            onClick={handleThemeChange("dark")}
            className={`flex items-center w-full px-4 py-2 text-sm hover:bg-muted ${theme === "dark" ? "text-accent font-medium" : ""}`}
          >
            <i className="ri-moon-line mr-2"></i>
            Dark
            {theme === "dark" && <i className="ri-check-line ml-auto"></i>}
          </button>
          <button
            onClick={handleThemeChange("system")}
            className={`flex items-center w-full px-4 py-2 text-sm hover:bg-muted ${theme === "system" ? "text-accent font-medium" : ""}`}
          >
            <i className="ri-computer-line mr-2"></i>
            System
            {theme === "system" && <i className="ri-check-line ml-auto"></i>}
          </button>
        </div>
      )}
    </div>
  )
}
