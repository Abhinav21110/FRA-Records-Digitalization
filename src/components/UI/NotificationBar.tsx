import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Bell } from "lucide-react";
import { Button } from "./button";

export const NotificationBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [notifications] = useState([
    {
      id: 1,
      type: "alert",
      message: "Policy Update: New PMKISAN eligibility criteria effective from Q4 2024",
      priority: "high"
    }
  ]);

  if (!isVisible || notifications.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="glass-container mx-4 mt-2 p-4 rounded-xl border-warning/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <AlertTriangle className="h-5 w-5 text-warning" />
            </motion.div>
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">High Priority Alert</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {notifications[0].message}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="hover:bg-warning/10 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};