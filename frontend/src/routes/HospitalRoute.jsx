import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const HospitalRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user?.role !== "hospital") {
    return <Navigate to="/" />;
  }

  return children;
};

export default HospitalRoute;
