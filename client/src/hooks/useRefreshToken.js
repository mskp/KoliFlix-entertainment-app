// Importing the custom React hook for handling authentication state
import useAuth from "@/hooks/useAuth";

// Importing Axios for making HTTP requests
import axios from "axios";

// Defining the server URL, using the environment variable if available, or a default local URL
const SERVER_URL = import.meta.env.VITE_SERVER_URL ?? "http://localhost:8000";

// Custom React hook for refreshing the authentication token
export default function useRefreshToken() {
    // Destructuring the 'setAuth' function from the 'useAuth' hook
    const { setAuth } = useAuth();

    // Returning an asynchronous function to handle the token refresh
    return async () => {
        try {
            // Making a POST request to the server's refresh token endpoint
            const response = await axios.post(
                `${SERVER_URL}/api/refresh`,
                {},
                { withCredentials: true }  // Sending credentials along with the request
            );

            // Extracting the new access token from the response data, or using an empty string if not available
            const accessToken = response?.data?.accessToken ?? "";

            // Updating the authentication state with the new access token
            setAuth(accessToken);
        } catch (error) {
            console.clear();
        }
    };
}
