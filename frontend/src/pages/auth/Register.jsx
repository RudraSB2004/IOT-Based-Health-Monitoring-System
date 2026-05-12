import { useState } from "react";

import { useDispatch } from "react-redux";

import { registerUser } from "../../redux/slices/authSlice";

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    password: "",

    role: "patient",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData));
  };

  return (
    <div
      className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-slate-950
    "
    >
      <form
        onSubmit={handleSubmit}
        className="
        glass
        p-10
        rounded-3xl
        w-[450px]
        "
      >
        <h1
          className="
        text-4xl
        text-cyan-400
        mb-8
        "
        >
          Register
        </h1>

        {/* NAME */}

        <input
          type="text"
          placeholder="Name"
          className="
          w-full
          p-4
          mb-4
          rounded-xl
          bg-slate-900
          text-white
          "
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Email"
          className="
          w-full
          p-4
          mb-4
          rounded-xl
          bg-slate-900
          text-white
          "
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value,
            })
          }
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          className="
          w-full
          p-4
          mb-4
          rounded-xl
          bg-slate-900
          text-white
          "
          onChange={(e) =>
            setFormData({
              ...formData,
              password: e.target.value,
            })
          }
        />

        {/* ROLE */}

        <select
          className="
          w-full
          p-4
          mb-4
          rounded-xl
          bg-slate-900
          text-white
          "
          onChange={(e) =>
            setFormData({
              ...formData,
              role: e.target.value,
            })
          }
        >
          <option value="patient">Patient</option>

          <option value="hospital">Hospital</option>
        </select>

        {/* BUTTON */}

        <button
          className="
          w-full
          bg-cyan-500
          py-4
          rounded-xl
          mt-4
          hover:bg-cyan-400
          transition
          "
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
