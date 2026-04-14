import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VoiceContext = createContext<any>(null);

export const VoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();
  
  const actionsRef = useRef<Record<string, () => void>>({});

  useEffect(() => {
    actionsRef.current = {
      // NAVIGATION COMMANDS
      "go to admin": () => navigate("/admin"),
      "go to patient": () => navigate("/login/patient"),
      "go to pharmacy": () => navigate("/pharmacy"),
      "go home": () => navigate("/"),

      // DYNAMIC UI COMMANDS (Marking Location, Google Auth)
      "access location": () => {
        toast.info("Accessing GPS Location...");
        // This looks for a button with "location" in its text or a specific ID
        const locBtn = document.querySelector('[id*="location"], [aria-label*="location"]');
        if (locBtn instanceof HTMLElement) locBtn.click();
      },

      "continue with google": () => {
        toast.info("Initializing Google Authentication...");
        // Finds the Auth0/Google button specifically
        const googleBtn = Array.from(document.querySelectorAll('button')).find(
          el => el.textContent?.toLowerCase().includes("google")
        );
        if (googleBtn) googleBtn.click();
      },

      // UTILITY
      "scroll down": () => window.scrollBy({ top: 500, behavior: "smooth" }),
      "scroll up": () => window.scrollBy({ top: -500, behavior: "smooth" }),
    };
  }, [navigate]);

  const startGlobalListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        console.log("PharmaGO NLP:", transcript);

        // 1. Check for hardcoded actions
        let found = false;
        Object.entries(actionsRef.current).forEach(([command, action]) => {
          if (transcript.includes(command)) {
            action();
            found = true;
          }
        });

        // 2. Fallback: Generic Clicker (If you say "Click [Button Name]")
        if (!found && transcript.startsWith("click")) {
          const target = transcript.replace("click", "").trim();
          const buttons = Array.from(document.querySelectorAll('button'));
          const btn = buttons.find(b => b.textContent?.toLowerCase().includes(target));
          if (btn) {
            toast.success(`Clicking ${target}`);
            btn.click();
          }
        }
      };

      recognitionRef.current = recognition;
    }

    isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
  };

  return (
    <VoiceContext.Provider value={{ isListening, startGlobalListening }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useGlobalVoice = () => useContext(VoiceContext);