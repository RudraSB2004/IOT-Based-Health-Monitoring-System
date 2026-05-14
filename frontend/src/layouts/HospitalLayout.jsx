import { Outlet, useNavigate, NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../redux/slices/authSlice";

import { Building2, Activity, Bell, Brain } from "lucide-react";

const HospitalLayout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `w-full text-left px-4 py-3 rounded-xl transition flex items-center gap-2 ${
      isActive
        ? "bg-cyan-500/20 text-cyan-300 font-semibold"
        : "text-gray-400 hover:text-white hover:bg-slate-800/50"
    }`;

  return (
    <div className="h-screen overflow-hidden bg-[#020617] text-white flex">
      {/* SIDEBAR */}

      <aside className="w-64 bg-slate-900/50 border-r border-cyan-500/20 p-6 hidden md:flex flex-col justify-between backdrop-blur-md sticky top-0 h-screen">
        <div>
          <div className="mb-10">
            <h1 className="text-2xl font-black text-cyan-400">MED ADMIN</h1>

            <p className="text-xs text-gray-500 mt-1">AI Healthcare Control</p>
          </div>

          <nav className="space-y-3">
            <NavLink to="/hospital" end className={navClass}>
              <Activity size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/hospital/alerts" className={navClass}>
              <Bell size={18} />
              Alerts
            </NavLink>

            <NavLink to="/hospital/ai" className={navClass}>
              <Brain size={18} />
              AI Assistant
            </NavLink>

            <NavLink to="/hospital/setup" className={navClass}>
              <Building2 size={18} />
              Edit Profile
            </NavLink>
          </nav>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-3 border border-red-500/50 text-red-400 rounded-xl hover:bg-red-500/10 transition"
        >
          Logout Session
        </button>
      </aside>

      {/* MAIN */}

      <main className="flex-1 overflow-y-auto">
        <div className="md:hidden flex justify-between items-center p-4 border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
          <h1 className="font-bold text-cyan-400">MED ADMIN</h1>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate("/hospital/setup")}
              className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg"
            >
              <Building2 size={18} />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 border border-red-500/50 text-red-400 rounded-lg"
            >
              Exit
            </button>
          </div>
        </div>

        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default HospitalLayout;
