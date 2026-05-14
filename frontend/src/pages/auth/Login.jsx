import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Grab the user from Redux
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Automatically redirect based on role when user state updates
  useEffect(() => {
    if (user) {
      if (user.role === "hospital") {
        navigate("/hospital");
      } else {
        navigate("/patient");
      }
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="glass p-10 rounded-3xl w-[400px]"
      >
        <h1 className="text-4xl text-cyan-400 mb-8">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded-xl bg-slate-900 text-white"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-4 rounded-xl bg-slate-900 text-white"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-4 rounded-xl mt-4 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
