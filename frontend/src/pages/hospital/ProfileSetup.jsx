import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { saveHospitalProfile } from "../../redux/slices/hospitalSlice";
import HologramCard from "../../effects/HologramCard";
import toast from "react-hot-toast";

const HospitalProfileSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.hospital);

  const [formData, setFormData] = useState({
    hospitalName: "",
    adminName: "",
    location: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your schema expects specialization as an array
    const payload = {
      ...formData,
      specialization: ["Cardiology", "General Medicine"],
    };

    const resultAction = await dispatch(saveHospitalProfile(payload));
    if (saveHospitalProfile.fulfilled.match(resultAction)) {
      toast.success("Hospital Network Activated!");
      navigate("/hospital"); // Send to dashboard
    } else {
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl z-10"
      >
        <HologramCard>
          <h1 className="text-4xl font-black text-blue-400 mb-2">
            Hospital Network Setup
          </h1>
          <p className="text-gray-400 mb-8">
            Register your institution to the centralized AI grid.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="hospitalName"
              placeholder="Official Hospital Name"
              required
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-blue-400 focus:outline-none transition"
            />

            <input
              type="text"
              name="adminName"
              placeholder="Administrator Name"
              required
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-blue-400 focus:outline-none transition"
            />

            <input
              type="text"
              name="location"
              placeholder="Full Address / Location"
              required
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-blue-400 focus:outline-none transition"
            />

            <input
              type="text"
              name="contactNumber"
              placeholder="Emergency Contact Number"
              required
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-blue-400 focus:outline-none transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-xl mt-4 transition shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              {loading ? "Registering..." : "Connect to Network"}
            </button>
          </form>
        </HologramCard>
      </motion.div>
    </div>
  );
};

export default HospitalProfileSetup;
