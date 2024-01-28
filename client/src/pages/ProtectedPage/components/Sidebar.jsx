import { NavLink } from "react-router-dom";
import { MdMovie } from "react-icons/md";
import { TiHome } from "react-icons/ti";
import { PiTelevisionFill } from "react-icons/pi";
import { MdBookmark } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import useLogoutModal from "@/hooks/useLogoutModal"; // Import custom hook
import shortLogo from "@/assets/logo.png";

// Data for the sidebar navigation links
const navbarData = [
  { path: "/", icon: <TiHome size={"2rem"} /> },
  { path: "/movies", icon: <MdMovie size={"2rem"} /> },
  { path: "/series", icon: <PiTelevisionFill size={"2rem"} /> },
  { path: "/bookmarks", icon: <MdBookmark size={"2rem"} /> },
];

// Sidebar component with navigation links and logout button
export default function Sidebar() {
  // Custom hook to manage the logout modal state
  const { setIsOpen } = useLogoutModal();

  return (
    <aside className="flex flex-col items-center w-16  py-8 bg-[#0c131f] border-r rtl:border-l rtl:border-r-0 dark:border-gray-700">
      <nav className="flex flex-col flex-1 space-y-6 items-center justify-between">
        {/* Logo */}
        <img src={shortLogo} alt="koliflix" className="w-6" />

        {/* Navigation Links */}
        <ul className="flex flex-col gap-5">
          {navbarData.map((current) => (
            <li key={current.path}>
              {/* NavLink for each navigation item */}
              <NavLink
                className={({ isActive }) =>
                  isActive ? "sidebar-icon sidebar-icon-active" : "sidebar-icon"
                }
                to={current.path}
                replace={true}
              >
                {current.icon}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="sidebar-icon hover:bg-red-600"
        >
          <LuLogOut size={"2rem"} className="" />
        </button>
      </nav>
    </aside>
  );
}
