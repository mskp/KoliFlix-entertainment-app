// Importing React Icons for the close button
import { IoCloseCircleSharp } from "react-icons/io5";

// ErrorAlert component definition
export default function ErrorAlert({ error, onClick }) {
  return (
    // Container for the error alert with styling
    <div
      className="bg-red-500 bg-opacity-10 border border-red-400 p-2 rounded-lg relative"
      role="alert"
    >
      <div>
        {/* Displaying the error message */}
        <span className="block sm:inline">{error}</span>
      </div>
      {/* Close button with styling and onClick handler */}
      <button
        type="button"
        className="absolute top-0 bottom-0 right-0 p-2 text-xl hover:opacity-80"
        onClick={onClick}
      >
        <IoCloseCircleSharp />
      </button>
    </div>
  );
}
