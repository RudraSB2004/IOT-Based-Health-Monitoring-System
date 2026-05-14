import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { savePatientProfile } from "../../redux/slices/patientSlice";
import HologramCard from "../../effects/HologramCard";
import toast from "react-hot-toast";

const PatientProfileSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.patient);

  const [formData, setFormData] = useState({
    age: "",
    gender: "Male",
    height: "",
    weight: "",
    bloodGroup: "O+",
    location: "",
    emergencyContact: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(savePatientProfile(formData));
    if (savePatientProfile.fulfilled.match(resultAction)) {
      toast.success("Profile Activated!");
      navigate("/patient"); // Send to dashboard
    } else {
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#020617] to-[#020617] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl z-10"
      >
        <HologramCard>
          <h1 className="text-4xl font-black text-cyan-400 mb-2">
            Patient Initialization
          </h1>
          <p className="text-gray-400 mb-8">
            Please configure your biometrics for AI analysis.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <input
              type="number"
              name="age"
              placeholder="Age"
              required
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none transition"
            />

            <select
              name="gender"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none transition"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              required
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none transition"
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              required
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none transition"
            />

            <select
              name="bloodGroup"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none transition"
            >
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>

            <input
              type="text"
              name="location"
              placeholder="City/Location"
              required
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-cyan-400 focus:outline-none transition"
            />

            <input
              type="text"
              name="emergencyContact"
              placeholder="Emergency Contact No."
              required
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white md:col-span-2 focus:border-cyan-400 focus:outline-none transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full md:col-span-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 rounded-xl mt-4 transition shadow-[0_0_15px_rgba(0,255,255,0.4)]"
            >
              {loading ? "Syncing..." : "Initialize Profile"}
            </button>
          </form>
        </HologramCard>
      </motion.div>
    </div>
  );
};

export default PatientProfileSetup;
