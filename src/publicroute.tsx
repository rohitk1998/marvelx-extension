import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const hasWallet = localStorage.getItem("marvel-wallet-exist"); // Change this condition as needed
  return hasWallet === 'false' ||  hasWallet === null ? children : <Navigate to="/wallet-board" replace />;
};

export default PublicRoute;
