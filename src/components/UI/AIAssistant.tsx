import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageCircle, X, Send } from "lucide-react";
import { Button } from "./button";
import { Input } from "@/components/UI/input";

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your DSS Assistant. How can I help you navigate the FRA Digital Atlas today?"
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "user",
        content: message
      };
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: "ai",
          content: "I understand your query. Let me help you find the relevant information in the system."
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4, type: "spring", stiffness: 300 }}
      >
        <motion.button
          className="glass-container p-3 rounded-full shadow-glass hover:shadow-glass-hover"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-primary-glow" />
            ) : (
              <Bot className="h-6 w-6 text-primary-glow animate-pulse" />
            )}
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-6 w-80 h-96 glass-container rounded-2xl p-4 z-40"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Header */}
            <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-glass">
              <div className="glass-container p-2 rounded-lg">
                <Bot className="h-5 w-5 text-primary-glow" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">DSS Assistant</h3>
                <p className="text-xs text-muted-foreground">AI-Powered Support</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 mb-4 max-h-56 overflow-y-auto">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl text-sm ${
                      msg.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'glass-container'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about data or policies..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="glass-container border-glass"
              />
              <Button
                size="icon"
                onClick={handleSend}
                className="bg-primary hover:bg-primary-hover"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};