import { motion } from "framer-motion";

const HumanBody = ({ status }) => {
  const bodyGlow =
    status === "critical"
      ? "shadow-[0_0_40px_red]"
      : status === "warning"
        ? "shadow-[0_0_40px_yellow]"
        : "shadow-[0_0_40px_cyan]";

  const bodyColor =
    status === "critical"
      ? "#ff0040"
      : status === "warning"
        ? "#facc15"
        : "#00ffff";

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className={`
      relative
      glass
      rounded-3xl
      p-10
      flex
      flex-col
      items-center
      overflow-hidden
      ${bodyGlow}
      `}
    >
      {/* TITLE */}

      <h2
        className="
        text-3xl
        text-cyan-400
        font-bold
        mb-10
        "
      >
        Patient Condition
      </h2>

      {/* HUMAN */}

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="
        relative
        flex
        flex-col
        items-center
        "
      >
        {/* AURA */}

        <div
          className="
          absolute
          w-[260px]
          h-[500px]
          rounded-full
          blur-3xl
          opacity-20
          "
          style={{
            background: bodyColor,
          }}
        />

        {/* HEAD */}

        <motion.div
          animate={{
            boxShadow: [
              `0 0 20px ${bodyColor}`,
              `0 0 60px ${bodyColor}`,
              `0 0 20px ${bodyColor}`,
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="
          w-24
          h-24
          rounded-full
          border-4
          z-10
          "
          style={{
            borderColor: bodyColor,
          }}
        />

        {/* BODY */}

        <div
          className="
          relative
          w-28
          h-44
          rounded-[40px]
          border-4
          mt-2
          z-10
          "
          style={{
            borderColor: bodyColor,
          }}
        >
          {/* HEART */}

          <motion.div
            animate={{
              scale: [1, 1.4, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
            className="
            absolute
            top-10
            left-1/2
            -translate-x-1/2
            w-5
            h-5
            rounded-full
            bg-red-500
            shadow-[0_0_20px_red]
            "
          />

          {/* BODY LINES */}

          <div
            className="
            absolute
            inset-4
            border
            rounded-2xl
            opacity-30
            "
            style={{
              borderColor: bodyColor,
            }}
          />
        </div>

        {/* ARMS */}

        <div
          className="
          absolute
          top-[120px]
          flex
          justify-between
          w-[260px]
          "
        >
          <div
            className="
            w-24
            h-4
            rounded-full
            border-4
            rotate-12
            "
            style={{
              borderColor: bodyColor,
            }}
          />

          <div
            className="
            w-24
            h-4
            rounded-full
            border-4
            -rotate-12
            "
            style={{
              borderColor: bodyColor,
            }}
          />
        </div>

        {/* LEGS */}

        <div
          className="
          flex
          gap-8
          mt-2
          "
        >
          <div
            className="
            w-6
            h-40
            rounded-full
            border-4
            "
            style={{
              borderColor: bodyColor,
            }}
          />

          <div
            className="
            w-6
            h-40
            rounded-full
            border-4
            "
            style={{
              borderColor: bodyColor,
            }}
          />
        </div>

        {/* SCANNER LINE */}

        <motion.div
          animate={{
            y: [-200, 220, -200],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="
          absolute
          w-[240px]
          h-2
          bg-cyan-400
          blur-sm
          opacity-70
          "
        />
      </motion.div>

      {/* STATUS */}

      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="
        mt-10
        px-8
        py-3
        rounded-2xl
        text-xl
        font-bold
        uppercase
        border
        "
        style={{
          borderColor: bodyColor,
          color: bodyColor,
        }}
      >
        {status}
      </motion.div>
    </motion.div>
  );
};

export default HumanBody;
