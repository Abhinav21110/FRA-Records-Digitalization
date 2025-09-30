import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Button } from "../components/UI/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground p-6">
      <motion.div 
        className="glass-container p-12 rounded-2xl text-center space-y-6 max-w-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        >
          <AlertTriangle className="h-20 w-20 text-warning mx-auto" />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-destructive">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The requested page "{location.pathname}" does not exist in the FRA Digital Atlas system.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="w-full"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button 
            variant="default" 
            size="lg" 
            asChild
            className="w-full"
          >
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Return to Atlas
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
