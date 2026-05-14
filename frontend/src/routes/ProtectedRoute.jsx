import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const localToken = localStorage.getItem("token");

  // Check both Redux state AND local storage to prevent refresh kick-outs
  if (!token && !localToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
