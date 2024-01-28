// Footer component definition
export default function Footer() {
  return (
    // Footer container with styling
    <footer className="p-4 bg-zinc-900">
      {/* Text content including copyright and link to the about page */}
      <p className="text-sm text-center text-gray-500 sm:text-center flex flex-col gap-2">
        {/* Copyright information with the current year */}
        <span>
          © {new Date().getFullYear()} Koliflix . All Rights Reserved.
        </span>
        {/* Link to the about page with styling */}
        <a
          target="_blank"
          className="block text-indigo-500 hover:underline"
          href="https://sushant.fun"
        >
          About
        </a>
      </p>
    </footer>
  );
}
