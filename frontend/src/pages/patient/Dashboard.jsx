import { useEffect } from "react";

import { useSelector } from "react-redux";

import { motion } from "framer-motion";

import gsap from "gsap";

import HumanModel from "../../three/HumanModel";

import FloatingOrb from "../../three/FloatingOrb";

import MedicalParticles from "../../three/MedicalParticles";

import NeuralBackground from "../../three/NeuralBackground";

import HologramCard from "../../effects/HologramCard";

import ScanLine from "../../effects/ScanLine";

import AIAnalytics from "../../components/analytics/AIAnalytics";

import LiveECG from "../../components/realtime/LiveECG";

import NotificationPanel from "../../components/alerts/NotificationPanel";

import { analyzeHealth } from "../../utils/healthAnalyzer";

import useSocket from "../../hooks/useSocket";

const Dashboard = () => {
  // ================= SOCKET =================
  useSocket();

  // ================= REDUX =================
  const { liveData, alerts } = useSelector((state) => state.health);

  // ================= LATEST SENSOR DATA =================
  const latest = liveData[liveData.length - 1] || {
    temperature: 32,

    humidity: 70,

    heartRate: 82,

    spo2: 98,

    ecg: 540,

    status: "normal",
  };

  // ================= AI ANALYSIS =================
  const analysis = analyzeHealth(latest);

  // ================= ECG DATA =================
  const ecgValues =
    liveData.length > 0
      ? liveData.map((d) => d.ecg)
      : [500, 520, 540, 510, 560, 570, 550, 590, 530, 510, 500];

  // ================= GSAP =================
  useEffect(() => {
    gsap.from(".dashboard-title", {
      y: -100,

      opacity: 0,

      duration: 1.5,
    });

    gsap.from(".dashboard-card", {
      opacity: 0,

      y: 100,

      stagger: 0.2,

      duration: 1.2,
    });
  }, []);

  return (
    <div
      className="
      relative
      min-h-screen
      text-white
      overflow-hidden
      bg-[#020617]
      "
    >
      {/* ================= BACKGROUND ================= */}

      <NeuralBackground />

      <MedicalParticles />

      <FloatingOrb />

      {/* ================= MAIN CONTENT ================= */}

      <div
        className="
        relative
        z-10
        p-6
        lg:p-10
        "
      >
        {/* ================= HEADER ================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="
          flex
          flex-col
          lg:flex-row
          justify-between
          items-start
          lg:items-center
          mb-10
          "
        >
          <div>
            <h1
              className="
              dashboard-title
              text-5xl
              lg:text-7xl
              font-black
              neon-text
              "
            >
              HEALTH AI
            </h1>

            <p
              className="
              text-gray-400
              mt-3
              text-lg
              "
            >
              Futuristic Smart Healthcare Monitoring System
            </p>
          </div>

          {/* STATUS */}

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className="
            mt-6
            lg:mt-0
            px-6
            py-4
            rounded-2xl
            bg-cyan-500/10
            border
            border-cyan-400
            backdrop-blur-xl
            "
          >
            <h2 className="text-cyan-400">System Status</h2>

            <p className="text-2xl font-bold">ONLINE</p>
          </motion.div>
        </motion.div>

        {/* ================= HEALTH STATS ================= */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
          mb-10
          "
        >
          {/* TEMPERATURE */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
            dashboard-card
            hologram
            rounded-3xl
            p-6
            "
          >
            <h2 className="text-gray-400">Temperature</h2>

            <h1
              className="
            text-5xl
            font-bold
            text-cyan-400
            mt-4
            "
            >
              {latest.temperature}°
            </h1>
          </motion.div>

          {/* HUMIDITY */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
            dashboard-card
            hologram
            rounded-3xl
            p-6
            "
          >
            <h2 className="text-gray-400">Humidity</h2>

            <h1
              className="
            text-5xl
            font-bold
            text-cyan-400
            mt-4
            "
            >
              {latest.humidity}%
            </h1>
          </motion.div>

          {/* HEART RATE */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
            dashboard-card
            hologram
            rounded-3xl
            p-6
            "
          >
            <h2 className="text-gray-400">Heart Rate</h2>

            <h1
              className="
            text-5xl
            font-bold
            text-red-400
            mt-4
            "
            >
              {latest.heartRate}
            </h1>
          </motion.div>

          {/* SPO2 */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="
            dashboard-card
            hologram
            rounded-3xl
            p-6
            "
          >
            <h2 className="text-gray-400">SpO2</h2>

            <h1
              className="
            text-5xl
            font-bold
            text-green-400
            mt-4
            "
            >
              {latest.spo2}%
            </h1>
          </motion.div>
        </div>

        {/* ================= MAIN GRID ================= */}

        <div
          className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
          "
        >
          {/* ================= LEFT ================= */}

          <div className="space-y-8">
            {/* HUMAN MODEL */}

            <HologramCard>
              <ScanLine />

              <HumanModel />
            </HologramCard>

            {/* LIVE ECG */}

            <div className="dashboard-card">
              <LiveECG ecgValues={ecgValues} />
            </div>
          </div>

          {/* ================= RIGHT ================= */}

          <div className="space-y-8">
            {/* AI ANALYTICS */}

            <div className="dashboard-card">
              <AIAnalytics analysis={analysis} />
            </div>

            {/* EMERGENCY */}

            <HologramCard>
              <h2
                className="
                text-3xl
                text-cyan-400
                mb-5
                "
              >
                Emergency Scanner
              </h2>

              <div
                className="
                relative
                h-48
                rounded-3xl
                overflow-hidden
                bg-cyan-500/10
                border
                border-cyan-500
                "
              >
                {/* scanning line */}

                <motion.div
                  animate={{
                    y: [0, 180, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="
                  absolute
                  left-0
                  top-0
                  w-full
                  h-2
                  bg-cyan-400
                  blur-sm
                  "
                />

                <div
                  className="
                  flex
                  items-center
                  justify-center
                  h-full
                  text-4xl
                  font-bold
                  text-cyan-400
                  "
                >
                  ACTIVE
                </div>
              </div>
            </HologramCard>

            {/* NOTIFICATIONS */}

            <div className="dashboard-card">
              <NotificationPanel alerts={alerts} />
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
          className="
          text-center
          py-10
          text-gray-500
          "
        >
          AI Powered Healthcare Intelligence System
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
