import useLogoutModal from "@/hooks/useLogoutModal";
import useAuth from "@/hooks/useAuth";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/redux/api/authApi";

export default function LogoutModal() {
  // Custom hook to manage logout modal state
  const { isOpen, setIsOpen } = useLogoutModal();

  // Mutation hook for handling logout API call
  const [logout] = useLogoutMutation();

  // Custom hook to manage authentication state
  const { setAuth } = useAuth();

  // React Router's navigate function
  const navigate = useNavigate();

  // Function to handle the logout process
  const handleLogout = async () => {
    // Perform logout API call
    await logout();

    // Clear authentication state
    setAuth({});

    // Close the logout modal
    setIsOpen(false);

    // Navigate to the login page, replacing the current history entry
    navigate("/account/login", { replace: true });
  };

  return (
    <>
      {/* Render the logout modal if isOpen is true */}
      {isOpen && (
        <div
          id="popup-modal"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-full bg-zinc-900 bg-opacity-70"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md max-h-full">
            <div className="relative bg-zinc-800 bg-opacity-60 backdrop-blur-md rounded-lg shadow-xl">
              <div className="p-4 md:p-5 text-center">
                {/* Icon indicating an error */}
                <MdErrorOutline className="mx-auto w-12 h-12 mb-2 text-gray-500" />

                {/* Confirmation message */}
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to logout?
                </h3>

                {/* Action buttons for cancel and logout */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="text-violet-800 hover:text-white border border-purple-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-600 dark:focus:ring-purple-900"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
