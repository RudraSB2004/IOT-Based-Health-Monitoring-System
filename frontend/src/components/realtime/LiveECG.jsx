import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import { useMemo } from "react";

// ======================================

ChartJS.register(
  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  Tooltip,

  Filler,
);

// ======================================

const LiveECG = ({ ecgValues = [] }) => {
  // ====================================
  // MEMOIZED DATA
  // ====================================

  const data = useMemo(
    () => ({
      labels: ecgValues.map((_, i) => i),

      datasets: [
        {
          data: ecgValues,

          borderColor: "#00ffff",

          backgroundColor: "rgba(0,255,255,0.1)",

          borderWidth: 2,

          tension: 0.25,

          pointRadius: 0,

          fill: true,
        },
      ],
    }),
    [ecgValues],
  );

  // ====================================
  // OPTIONS
  // ====================================

  const options = useMemo(
    () => ({
      responsive: true,

      maintainAspectRatio: false,

      animation: false,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          enabled: false,
        },
      },

      scales: {
        x: {
          display: false,
        },

        y: {
          ticks: {
            color: "rgba(255,255,255,0.5)",
          },

          grid: {
            color: "rgba(255,255,255,0.08)",
          },
        },
      },
    }),
    [],
  );

  // ====================================

  return (
    <div
      className="
      glass
      rounded-3xl
      p-6
      glow
      h-[400px]
      "
    >
      <div className="flex justify-between items-center mb-5">
        <h2
          className="
          text-2xl
          text-cyan-400
          "
        >
          Live ECG Wave
        </h2>

        <div className="flex items-center gap-2 text-green-400 text-sm">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          LIVE
        </div>
      </div>

      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LiveECG;
