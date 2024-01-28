// Importing necessary dependencies and components
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import useRefreshToken from "@/hooks/useRefreshToken";
import LogoutModal from "./components/LogoutModal";
import Sidebar from "./components/Sidebar";
import LoadingSpinner from "@/components/LoadingSpinner";

// ProtectedPage component definition
export default function ProtectedPage() {
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(true);

  // Context hook to manage authentication state
  const { auth } = useAuth();

  // Hook for refreshing the access token
  const refreshAccessToken = useRefreshToken();

  // Ref to store the timeout ID for token refresh
  const timeoutId = useRef(null);

  useEffect(() => {
    // Function to verify and refresh the access token
    const verifyAndRefresh = async () => {
      try {
        // Attempt to refresh the access token
        await refreshAccessToken();
      } catch (error) {
        // Log an error message if refreshing fails
        console.error("Error refreshing token:", error.message || error);
      } finally {
        // Set loading state to false regardless of success or failure
        setIsLoading(false);
        // Set the timeout for the next refresh (28 minutes in milliseconds)
        const nextRefreshTimeout = 28 * 60 * 1000;
        timeoutId.current = setTimeout(verifyAndRefresh, nextRefreshTimeout);
      }
    };

    // Initial call to start the token refresh process
    verifyAndRefresh();

    // Cleanup function: Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId.current);
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  // If still loading, display a loading spinner
  if (isLoading) return <LoadingSpinner />;

  // If no access token is present, navigate to the login page
  if (!auth.accessToken) return <Navigate to="account/login" replace />;

  // JSX rendering for the protected page layout
  return (
    <main
      style={{ height: "100dvh" }}
      className="min-h-full grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto"
    >
      {/* Sidebar component for navigation */}
      <Sidebar />

      {/* Outlet for rendering nested routes */}
      <section className="overflow-x-hidden px-2 py-4">
        <Outlet />
      </section>

      {/* LogoutModal component for handling user logout */}
      <LogoutModal />
    </main>
  );
}
