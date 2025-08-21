import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    if (user.role === "librarian") {
      return <Navigate to="/dashboard" replace />;
    }

    if (user.role === "borrower") {
      return <Navigate to="/borrower-dashboard" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
