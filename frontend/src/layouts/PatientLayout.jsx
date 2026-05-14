import { Outlet, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../redux/slices/authSlice";

import { UserCog } from "lucide-react";

import useSocket from "../hooks/useSocket";

const PatientLayout = () => {
  // ====================================
  // SOCKET INIT
  // ====================================

  useSocket();

  // ====================================

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // ====================================
  // LOGOUT
  // ====================================

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  // ====================================

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* ================================= */}
      {/* NAVBAR */}
      {/* ================================= */}

      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4 flex justify-between items-center">
        {/* LOGO */}

        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-cyan-500 animate-pulse"></div>

          <h1 className="text-xl font-bold text-cyan-400 tracking-widest">
            HEALTH
            <span className="text-white">AI</span>
          </h1>
        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-4">
          {/* PROFILE BUTTON */}

          <button
            type="button"
            onClick={() => navigate("/patient/setup")}
            className="flex items-center gap-2 px-4 py-2 text-sm text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition"
          >
            <UserCog size={16} />

            <span className="hidden sm:inline">Edit Biometrics</span>
          </button>

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 text-sm border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition"
          >
            Disconnect
          </button>
        </div>
      </nav>

      {/* ================================= */}
      {/* PAGE CONTENT */}
      {/* ================================= */}

      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default PatientLayout;
