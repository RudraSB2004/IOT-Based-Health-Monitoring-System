import { useState } from "react";

import { useDispatch } from "react-redux";

import { loginUser } from "../../redux/slices/authSlice";

const Login = () => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

        <h1 className="text-4xl text-cyan-400 mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded-xl bg-slate-900"
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-4 rounded-xl bg-slate-900"
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        <button
          className="w-full bg-cyan-500 py-4 rounded-xl mt-4"
        >
          Login
        </button>

      </form>

    </div>
  );
};

export default Login;