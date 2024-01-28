// Importing necessary dependencies for routing and displaying toasts
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Importing React components for different pages and components
import Home from "./pages/ProtectedPage/Home";
import Movies from "./pages/ProtectedPage/Movies";
import Series from "./pages/ProtectedPage/Series";
import Bookmarks from "./pages/ProtectedPage/Bookmarks";
import Login from "./pages/AuthPage/Login";
import Signup from "./pages/AuthPage/Signup";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./components/ErrorPage";
import ProtectedPage from "./pages/ProtectedPage";
import DetailsPage from "./pages/ProtectedPage/DetailsPage";

// Creating the router configuration
const router = createBrowserRouter([
  // Protected routes
  {
    element: <ProtectedPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "movies", element: <Movies /> },
      { path: "series", element: <Series /> },
      { path: "bookmarks", element: <Bookmarks /> },
      {
        path: "detail/:id",
        element: <DetailsPage />,
        loader: ({ params }) => params.id,
      },
    ],
  },
  // Auth routes
  {
    path: "account",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  // Fallback route for 404 errors
  { path: "*", element: <ErrorPage error={"404 | Page not found"} /> },
]);

// Main App component
function App() {
  return (
    <>
      {/* Providing the router to the entire application */}
      <RouterProvider router={router} />

      {/* Toaster component for displaying toast notifications */}
      <Toaster
        toastOptions={{
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
          duration: 2000,
        }}
      />
    </>
  );
}

// Exporting the App component as the default export
export default App;
