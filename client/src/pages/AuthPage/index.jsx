// Importing necessary dependencies from React and React Router
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

// Importing custom hooks and components
import useRefreshToken from "@/hooks/useRefreshToken";
import LoadingSpinner from "@/components/LoadingSpinner";
import Footer from "./components/Footer";

// AuthPage component definition
export default function AuthPage() {
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // Context hook to manage authentication state
  const { auth } = useAuth();

  // Hook for refreshing the access token
  const refresh = useRefreshToken();

  // Access token obtained from the context
  const accessToken = auth?.accessToken;

  // Effect to check and refresh the token if necessary
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // Attempting to refresh the access token
        await refresh();
      } catch (error) {
        console.error(error.message);
      } finally {
        // Setting loading state to false regardless of success or failure
        setIsLoading(false);
      }
    };

    // If no access token is present, attempt to refresh it
    !accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, [accessToken, refresh]);

  // If still loading, display a loading spinner
  if (isLoading) return <LoadingSpinner />;

  // If access token is present, navigate to the home page
  if (accessToken) return <Navigate to="/" replace />;

  // If no access token, display the outlet and footer
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
