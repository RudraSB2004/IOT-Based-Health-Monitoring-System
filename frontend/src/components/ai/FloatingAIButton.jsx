import { Bot } from "lucide-react";

const FloatingAIButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-cyan-500 text-black shadow-[0_0_40px_rgba(0,255,255,0.5)] flex items-center justify-center hover:scale-110 transition-all duration-300 animate-pulse"
    >
      <Bot size={30} />
    </button>
  );
};

export default FloatingAIButton;
