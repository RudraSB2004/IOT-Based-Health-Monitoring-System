import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const PatientRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role !== "patient") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PatientRoute;
