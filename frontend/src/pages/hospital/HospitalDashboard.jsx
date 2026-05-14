import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";

import {
  Activity,
  HeartPulse,
  Siren,
  Cpu,
  Users,
  Wifi,
  ChevronRight,
} from "lucide-react";

import HologramCard from "../../effects/HologramCard";

import {
  fetchHospitalPatients,
  fetchRealtimePatientData,
  fetchPatientReports,
  setSelectedPatient,
} from "../../redux/slices/hospitalSlice";

import LiveECG from "../../components/realtime/LiveECG";

const HospitalDashboard = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // ====================================

  const {
    profile,
    patients = [],
    selectedPatient,
    realtimeData = [],
  } = useSelector((state) => state.hospital);

  const { alerts = [], connectionStatus } = useSelector(
    (state) => state.health,
  );

  // ====================================
  // FETCH PATIENTS
  // ====================================

  useEffect(() => {
    dispatch(fetchHospitalPatients());
  }, [dispatch]);

  // ====================================
  // SELECT PATIENT
  // ====================================

  const handleSelectPatient = (patient) => {
    dispatch(setSelectedPatient(patient));

    dispatch(fetchRealtimePatientData(patient._id));

    dispatch(fetchPatientReports(patient._id));
  };

  // ====================================

  const latestRealtime = realtimeData.length > 0 ? realtimeData[0] : null;

  const ecgValues = realtimeData.flatMap((d) => d.ecg || []);

  // ====================================

  const stats = [
    {
      title: "Total Patients",

      value: patients.length,

      icon: Users,

      color: "text-cyan-400",
    },

    {
      title: "Critical Alerts",

      value: alerts.length,

      icon: Siren,

      color: "text-red-400",
    },

    {
      title: "AI Monitoring",

      value: connectionStatus ? "ACTIVE" : "OFFLINE",

      icon: Cpu,

      color: connectionStatus ? "text-green-400" : "text-gray-500",
    },

    {
      title: "Devices Online",

      value: connectionStatus ? realtimeData.length : 0,

      icon: Wifi,

      color: connectionStatus ? "text-yellow-400" : "text-gray-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 lg:p-10">
      {/* HEADER */}

      <div className="mb-10 flex flex-col lg:flex-row justify-between gap-6">
        <div>
          <h1 className="text-5xl font-black text-cyan-400">
            HOSPITAL COMMAND CENTER
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            AI-powered realtime healthcare monitoring
          </p>
        </div>

        {!profile && (
          <button
            type="button"
            onClick={() => navigate("/hospital/setup")}
            className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 font-bold text-black"
          >
            Complete Hospital Setup
          </button>
        )}
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.03,
              }}
              className="bg-slate-900/50 border border-cyan-500/10 rounded-3xl p-6 backdrop-blur-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>

                  <h2 className={`text-4xl font-black mt-3 ${stat.color}`}>
                    {stat.value}
                  </h2>
                </div>

                <Icon size={40} className={stat.color} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* PATIENT LIST */}

        <div className="xl:col-span-1">
          <HologramCard>
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-cyan-400" />

              <h2 className="text-3xl text-cyan-400">Patients</h2>
            </div>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {patients.length === 0 ? (
                <div className="text-gray-500 text-center py-10">
                  No patients found
                </div>
              ) : (
                patients.map((patient) => (
                  <button
                    key={patient._id}
                    type="button"
                    onClick={() => handleSelectPatient(patient)}
                    className="w-full text-left bg-slate-900/60 border border-slate-800 rounded-2xl p-4 hover:border-cyan-400 transition"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-lg text-white">
                          {patient.user?.name}
                        </h3>

                        <p className="text-gray-400 text-sm mt-1">
                          Click for realtime monitoring
                        </p>
                      </div>

                      <ChevronRight className="text-cyan-400" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </HologramCard>
        </div>

        {/* REALTIME MONITOR */}

        <div className="xl:col-span-2 space-y-8">
          {!selectedPatient ? (
            <HologramCard>
              <div className="h-[500px] flex items-center justify-center text-gray-500 text-xl">
                Select a patient to start monitoring
              </div>
            </HologramCard>
          ) : (
            <>
              {/* PATIENT HEADER */}

              <HologramCard>
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h2 className="text-4xl font-black text-cyan-400">
                      {selectedPatient.user?.name}
                    </h2>

                    <p className="text-gray-400 mt-2">
                      AI realtime monitoring active
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-green-400 font-bold">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                    LIVE
                  </div>
                </div>
              </HologramCard>

              {/* HEALTH STATS */}

              {latestRealtime && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <HologramCard>
                    <p className="text-gray-400 mb-3">Heart Rate</p>

                    <h2 className="text-5xl font-black text-red-400">
                      {latestRealtime.heartRate}
                    </h2>

                    <p className="text-gray-500 mt-2">BPM</p>
                  </HologramCard>

                  <HologramCard>
                    <p className="text-gray-400 mb-3">SpO2</p>

                    <h2 className="text-5xl font-black text-cyan-400">
                      {latestRealtime.spo2}%
                    </h2>
                  </HologramCard>

                  <HologramCard>
                    <p className="text-gray-400 mb-3">Temperature</p>

                    <h2 className="text-5xl font-black text-yellow-400">
                      {latestRealtime.temperature}
                    </h2>
                  </HologramCard>

                  <HologramCard>
                    <p className="text-gray-400 mb-3">Status</p>

                    <h2
                      className={`text-3xl font-black ${
                        latestRealtime.status === "critical"
                          ? "text-red-400"
                          : latestRealtime.status === "warning"
                            ? "text-yellow-400"
                            : "text-green-400"
                      }`}
                    >
                      {latestRealtime.status}
                    </h2>
                  </HologramCard>
                </div>
              )}

              {/* ECG */}

              <LiveECG ecgValues={ecgValues} />

              {/* ALERTS */}

              <HologramCard>
                <div className="flex items-center gap-3 mb-6">
                  <Siren className="text-red-400" />

                  <h2 className="text-2xl text-red-400">Emergency Alerts</h2>
                </div>

                {alerts.length === 0 ? (
                  <div className="text-gray-500 py-10 text-center">
                    No alerts detected
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alerts.map((alert, index) => (
                      <div
                        key={index}
                        className="bg-red-500/10 border border-red-500 rounded-2xl p-4"
                      >
                        <div className="flex justify-between mb-2">
                          <p className="font-bold text-red-400">
                            Critical Alert
                          </p>

                          <HeartPulse className="text-red-400" />
                        </div>

                        <p className="text-sm text-gray-300">
                          HR: {alert.heartRate} | SpO2: {alert.spo2}%
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </HologramCard>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;
