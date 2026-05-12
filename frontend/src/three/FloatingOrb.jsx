import { motion } from "framer-motion";

const FloatingOrb = () => {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],

        scale: [1, 1.1, 1],
      }}
      transition={{
        repeat: Infinity,

        duration: 3,
      }}
      className="
      fixed
      bottom-10
      right-10
      w-24
      h-24
      rounded-full
      bg-cyan-400
      blur-[2px]
      shadow-[0_0_50px_cyan]
      z-50
      "
    />
  );
};

export default FloatingOrb;
