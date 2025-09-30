import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { FloatingDock } from "../UI/FloatingDock";
import { NotificationBar } from "../UI/NotificationBar";
import { AIAssistant } from "../UI/AIAssistant";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply theme class to document
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      {/* Flowing 3D Glass Background */}
      <div className="glass-flow-bg" />
      
      {/* Header */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      {/* Notification Bar */}
      <NotificationBar />
      
      {/* Main Content */}
      <main className="flex-1 relative">
        <motion.div
          key={location.pathname} // Add key to re-trigger animation on route change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
      
      {/* Floating UI Elements */}
      <FloatingDock />
      <AIAssistant />
    </div>
  );
};