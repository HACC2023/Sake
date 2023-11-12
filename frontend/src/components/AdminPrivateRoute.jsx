import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivateRoute = () => {
  const { userInfo } = useSelector(state => state.auth);
  return userInfo?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminPrivateRoute;
