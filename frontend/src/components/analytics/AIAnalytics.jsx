import { motion } from "framer-motion";

const AIAnalytics = ({ analysis }) => {
  const scoreColor =
    analysis.score >= 80
      ? "text-green-400"
      : analysis.score >= 50
        ? "text-yellow-400"
        : "text-red-400";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
      glass
      rounded-3xl
      p-6
      glow
      "
    >
      <h2
        className="
        text-3xl
        text-cyan-400
        mb-5
        "
      >
        AI Health Analysis
      </h2>

      <div className="space-y-6">
        {/* CONDITION */}

        <div>
          <h3 className="text-gray-400 mb-2">Health Condition</h3>

          <p
            className="
            text-2xl
            font-bold
            "
          >
            {analysis.condition}
          </p>
        </div>

        {/* SCORE */}

        <div>
          <h3 className="text-gray-400 mb-2">Health Score</h3>

          <p
            className={`
            text-5xl
            font-bold
            ${scoreColor}
            `}
          >
            {analysis.score}%
          </p>
        </div>

        {/* PROGRESS */}

        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`
            h-full
            transition-all
            duration-500

            ${
              analysis.score >= 80
                ? "bg-green-400"
                : analysis.score >= 50
                  ? "bg-yellow-400"
                  : "bg-red-400"
            }
            `}
            style={{
              width: `${analysis.score}%`,
            }}
          />
        </div>

        {/* RECOMMENDATION */}

        <div>
          <h3 className="text-gray-400 mb-2">AI Recommendation</h3>

          <p className="text-lg leading-relaxed text-gray-200">
            {analysis.recommendation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAnalytics;
