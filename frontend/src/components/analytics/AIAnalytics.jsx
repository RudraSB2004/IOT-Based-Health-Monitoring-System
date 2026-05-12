import { motion } from "framer-motion";

const AIAnalytics = ({ analysis }) => {
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

      <div className="space-y-4">
        <div>
          <h3 className="text-gray-400">Health Condition</h3>

          <p
            className="
          text-2xl
          font-bold
          "
          >
            {analysis.condition}
          </p>
        </div>

        <div>
          <h3 className="text-gray-400">Health Score</h3>

          <p
            className="
          text-5xl
          font-bold
          text-cyan-400
          "
          >
            {analysis.score}%
          </p>
        </div>

        <div>
          <h3 className="text-gray-400">Recommendation</h3>

          <p className="text-lg">{analysis.recommendation}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAnalytics;
