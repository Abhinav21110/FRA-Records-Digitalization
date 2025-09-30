import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Printer, 
  BarChart3, 
  Search, 
  FileText,
  TrendingUp,
  Map
} from "lucide-react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

export const FloatingDock = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const dockItems = [
    {
      icon: Printer,
      label: "Print Report",
      action: () => window.print(),
      color: "text-info"
    },
    {
      icon: BarChart3,
      label: "DSS Summary",
      action: () => navigate("/dashboard"),
      color: "text-accent"
    },
    {
      icon: Search,
      label: "Archive Search",
      action: () => navigate("/archive"),
      color: "text-secondary"
    },
    {
      icon: Map,
      label: "Atlas View",
      action: () => navigate("/"),
      color: "text-primary-glow"
    }
  ];

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="glass-container p-1 rounded-2xl"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex flex-col space-y-2">
          {dockItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                className={`glass-container p-3 rounded-xl hover:shadow-glass-hover transition-all duration-300 flex items-center space-x-3 ${
                  isExpanded ? "w-36" : "w-10"
                }`}
                onClick={item.action}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};