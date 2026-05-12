import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const LiveECG = ({ ecgValues }) => {
  const data = {
    labels: ecgValues.map((_, i) => i),

    datasets: [
      {
        data: ecgValues,

        borderColor: "#00ffff",

        borderWidth: 3,

        tension: 0.4,

        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,

    animation: {
      duration: 300,
    },

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        display: false,
      },

      y: {
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  return (
    <div
      className="
    glass
    rounded-3xl
    p-6
    glow
    "
    >
      <h2
        className="
      text-2xl
      mb-5
      text-cyan-400
      "
      >
        Live ECG Wave
      </h2>

      <Line data={data} options={options} />
    </div>
  );
};

export default LiveECG;
