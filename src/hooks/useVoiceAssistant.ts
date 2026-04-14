import { useState, useCallback, useRef } from "react";

export function useVoiceAssistant(actions: Record<string, () => void>) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      // KEY CHANGE: Continuous listening
      recognition.continuous = true; 
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      
      recognition.onresult = (event: any) => {
        // Loop through all results in the continuous stream
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript.toLowerCase().trim();
        
        console.log("Continuous Input:", transcript);

        Object.entries(actions).forEach(([keyword, action]) => {
          if (transcript.includes(keyword.toLowerCase())) {
            action();
          }
        });
      };

      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      
      recognitionRef.current = recognition;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  }, [actions, isListening]);

  return { isListening, startListening };
}