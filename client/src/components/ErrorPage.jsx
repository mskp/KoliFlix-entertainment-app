// Importing the Link component from react-router-dom for navigation
import { Link } from "react-router-dom";

// React component for displaying an error message with a link to the home page
export default function ErrorPage({ error = "Some error occurred" }) {
  return (
    <main style={{ height: "100vh" }} className="grid items-center">
      <h1 className="text-3xl text-gray-400 text-center">
        <span className="underline">{error}</span>
        <span className="block text-lg p-2">
          Navigate to
          <Link
            to="/"
            className="text-indigo-500 hover:opacity-80 hover:underline"
          >
            Home
          </Link>
        </span>
      </h1>
    </main>
  );
}
