import { useState } from "react";

import FloatingAIButton from "./FloatingAIButton";

import AIChatWindow from "./AIChatWindow";

const AIAssistant = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatingAIButton onClick={() => setOpen(true)} />

      <AIChatWindow isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AIAssistant;
