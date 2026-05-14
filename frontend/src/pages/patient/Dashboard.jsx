import { useEffect } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

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
import AIAssistant from "../../components/ai/AIAssistant";
import useSocket from "../../hooks/useSocket";

// ========================================

const Dashboard = () => {
  // ======================================
  // SOCKET INIT
  // ======================================

  // ======================================

  const navigate = useNavigate();

  // ======================================
  // REDUX STATE
  // ======================================

  const { latestVitals, ecgStream, alerts, connectionStatus } = useSelector(
    (state) => state.health,
  );

  const { profile } = useSelector((state) => state.patient);

  // ======================================
  // CONNECTION STATE
  // ======================================

  const isConnected = connectionStatus;

  // ======================================
  // SAFE FALLBACKS
  // ======================================

  const latest = latestVitals || {
    temperature: 0,

    humidity: 0,

    heartRate: 0,

    spo2: 0,

    status: "normal",
  };

  // ======================================
  // AI ANALYSIS
  // ======================================

  const analysis = isConnected
    ? analyzeHealth(latest)
    : {
        condition: "Waiting...",

        score: 0,

        recommendation: "Awaiting sensor data",
      };

  // ======================================
  // ECG STREAM
  // ======================================

  const ecgValues =
    ecgStream.length > 0 ? ecgStream.slice(-250) : Array(250).fill(0);

  // ======================================
  // GSAP ANIMATION
  // ======================================

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

  // ======================================

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-[#020617]">
      {/* ================================= */}
      {/* BACKGROUND EFFECTS */}
      {/* ================================= */}

      <NeuralBackground />

      <MedicalParticles />

      <FloatingOrb />

      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <div className="relative z-10 p-6 lg:p-10">
        {/* ================================= */}
        {/* PROFILE WARNING */}
        {/* ================================= */}

        {!profile && (
          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-8 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/50 flex flex-col sm:flex-row justify-between items-center gap-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>

              <div>
                <h3 className="text-yellow-400 font-bold">
                  Biometric Data Missing
                </h3>

                <p className="text-yellow-200/70 text-sm">
                  AI forecasting requires your physical profile for accurate
                  health analysis.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate("/setup/patient");
              }}
              className="whitespace-nowrap px-6 py-2 bg-yellow-500 text-slate-900 font-bold rounded-xl hover:bg-yellow-400 transition shadow-[0_0_15px_rgba(234,179,8,0.3)]"
            >
              Complete Profile
            </button>
          </motion.div>
        )}

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10"
        >
          <div>
            <h1 className="dashboard-title text-5xl lg:text-7xl font-black neon-text">
              HEALTH AI
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              AI-Powered Smart Healthcare Monitoring Platform
            </p>
          </div>

          {/* ============================= */}
          {/* STATUS CARD */}
          {/* ============================= */}

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
            }}
            className={`mt-6 lg:mt-0 px-6 py-4 rounded-2xl border backdrop-blur-xl ${
              isConnected
                ? "bg-cyan-500/10 border-cyan-400"
                : "bg-slate-800/50 border-slate-600"
            }`}
          >
            <h2 className={isConnected ? "text-cyan-400" : "text-gray-400"}>
              System Status
            </h2>

            <p
              className={`text-2xl font-bold ${
                isConnected ? "text-green-400" : "text-gray-500"
              }`}
            >
              {isConnected ? "SENSORS ONLINE" : "AWAITING HARDWARE"}
            </p>
          </motion.div>
        </motion.div>

        {/* ================================= */}
        {/* HEALTH STATS */}
        {/* ================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* TEMPERATURE */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="dashboard-card hologram rounded-3xl p-6"
          >
            <h2 className="text-gray-400">Temperature</h2>

            <h1 className="text-5xl font-bold text-cyan-400 mt-4">
              {latest.temperature}°C
            </h1>
          </motion.div>

          {/* HUMIDITY */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="dashboard-card hologram rounded-3xl p-6"
          >
            <h2 className="text-gray-400">Humidity</h2>

            <h1 className="text-5xl font-bold text-cyan-400 mt-4">
              {latest.humidity}%
            </h1>
          </motion.div>

          {/* HEART RATE */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="dashboard-card hologram rounded-3xl p-6"
          >
            <h2 className="text-gray-400">Heart Rate</h2>

            <h1 className="text-5xl font-bold text-red-400 mt-4">
              {latest.heartRate} BPM
            </h1>
          </motion.div>

          {/* SPO2 */}

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="dashboard-card hologram rounded-3xl p-6"
          >
            <h2 className="text-gray-400">SpO2</h2>

            <h1 className="text-5xl font-bold text-green-400 mt-4">
              {latest.spo2}%
            </h1>
          </motion.div>
        </div>

        {/* ================================= */}
        {/* MAIN GRID */}
        {/* ================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

          <div className="space-y-8">
            {/* HUMAN MODEL */}

            <HologramCard>
              <ScanLine />

              <HumanModel />
            </HologramCard>

            {/* ECG */}

            <div className="dashboard-card">
              <LiveECG ecgValues={ecgValues} />
            </div>
          </div>

          {/* ================================= */}
          {/* RIGHT SIDE */}
          {/* ================================= */}

          <div className="space-y-8">
            {/* AI ANALYTICS */}

            <div className="dashboard-card">
              <AIAnalytics analysis={analysis} />
            </div>

            {/* EMERGENCY SCANNER */}

            <HologramCard>
              <h2 className="text-3xl text-cyan-400 mb-5">Emergency Scanner</h2>

              <div className="relative h-48 rounded-3xl overflow-hidden bg-cyan-500/10 border border-cyan-500">
                <motion.div
                  animate={{
                    y: [0, 180, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                  className="absolute left-0 top-0 w-full h-2 bg-cyan-400 blur-sm"
                />

                <div className="flex items-center justify-center h-full text-4xl font-bold text-cyan-400">
                  ACTIVE
                </div>
              </div>
            </HologramCard>

            {/* ALERTS */}

            <div className="dashboard-card">
              <NotificationPanel alerts={alerts} />
            </div>
          </div>
        </div>
      </div>
      <AIAssistant />
    </div>
  );
};

export default Dashboard;
