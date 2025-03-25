import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const hasWallet = localStorage.getItem("marvel-wallet-exist"); // Change this condition as needed

  return hasWallet === 'true' ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
