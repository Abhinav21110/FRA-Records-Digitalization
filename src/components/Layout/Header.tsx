import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { 
  Globe2, 
  BarChart3, 
  Archive, 
  User, 
  Settings, 
  Sun, 
  Moon,
  Shield,
  LogOut
} from "lucide-react";
import { Button } from "../UI/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return { isScrolled, isHidden };
};

export const Header = ({ isDarkMode, setIsDarkMode }: HeaderProps) => {
  const { isHidden } = useScroll();

  const navigationItems = [
    { label: "FRA Atlas", path: "/", icon: Globe2 },
    { label: "DSS Dashboard", path: "/dashboard", icon: BarChart3 },
    { label: "Archive", path: "/archive", icon: Archive },
  ];

  return (
    <motion.header 
      className="glass-nav sticky top-0 z-50 p-4"
      animate={isHidden ? { y: "-100%", opacity: 0 } : { y: "0%", opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <motion.div 
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <div className="glass-container p-3 rounded-xl">
            <Shield className="h-8 w-8 text-primary-glow" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-glass-glow">FRA Digital Atlas</h1>
            <p className="text-sm text-muted-foreground">Decision Support System</p>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `glass-container px-6 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                  isActive
                    ? "bg-gradient-flow text-primary-foreground shadow-glass-hover"
                    : "hover:shadow-glass-hover hover:scale-105"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <motion.div
            className="glass-container p-2 rounded-xl cursor-pointer"
            onClick={() => setIsDarkMode(!isDarkMode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-warning" />
              ) : (
                <Moon className="h-5 w-5 text-primary-glow" />
              )}
            </motion.div>
          </motion.div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                className="glass-container p-1 rounded-xl cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AD
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="glass-container border-glass" 
              align="end"
            >
              <DropdownMenuLabel>Senior Administrator</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-glass-highlight">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-glass-highlight">
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-glass-highlight">
                <Archive className="mr-2 h-4 w-4" />
                Audit Logs
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive hover:bg-glass-highlight">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};