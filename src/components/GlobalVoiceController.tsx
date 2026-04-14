import { useGlobalVoice } from "@/contexts/VoiceContext";
import { useEffect } from "react";

export function GlobalVoiceController() {
  const { isListening } = useGlobalVoice();

  // This purely handles visual sync or global logging
  useEffect(() => {
    if (isListening) {
      console.log("System Status: Always Listening Active");
    }
  }, [isListening]);

  return null; 
}