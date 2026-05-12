// effects/ScanLine.jsx
import { motion } from "framer-motion";

const ScanLine = () => {
  return (
    <motion.div
      animate={{ y: ["0%", "100%", "0%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="
        absolute top-0 left-0 w-full h-[1px] 
        bg-gradient-to-r from-transparent via-cyan-400 to-transparent 
        shadow-[0_0_10px_cyan] z-50 opacity-40
      "
    />
  );
};

export default ScanLine;
