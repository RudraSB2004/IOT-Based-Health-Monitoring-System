// effects/HologramCard.jsx
import { motion } from "framer-motion";

const HologramCard = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-slate-950/40 backdrop-blur-2xl
        border border-cyan-500/10 hover:border-cyan-500/30
        shadow-[0_0_15px_rgba(0,255,255,0.02)]
        p-6 ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default HologramCard;
