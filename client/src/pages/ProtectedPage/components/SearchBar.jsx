import { BiSearchAlt2 } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import VideosGridLayout from "./VideosGridLayout";

// SearchBar component with search functionality
export default function SearchBar({ label, data }) {
  // Hook to manage search parameters in the URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Get search term from URL or set it as an empty string
  const searchTerm = searchParams.get("search") || "";

  // Convert search term to lowercase and trim any leading/trailing spaces
  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

  // Filter the data based on the search term
  const filteredData = lowerCaseSearchTerm
    ? data?.filter((current) =>
        current.name.toLowerCase().includes(lowerCaseSearchTerm),
      ) || []
    : [];

  // Check if original data is available
  const dataAvailable = data?.length && data?.length > 0;

  return (
    <>
      <div className="lg:w-1/2 my-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <BiSearchAlt2 className="text-2xl" />
          </div>
          {/* Search input field */}
          <input
            type="search"
            className="block w-full p-2 ps-10 text-lg border rounded-xl bg-zinc-900 border-gray-600 text-white"
            onChange={(e) => setSearchParams({ search: e.target.value })}
            disabled={!dataAvailable} // Disable input if no original data
            value={dataAvailable ? searchTerm : ""}
            placeholder={`Search for ${label}`}
          />
        </div>
      </div>
      {/* Display search results if available */}
      {(filteredData.length > 0 || searchTerm.trim()) && (
        <VideosGridLayout
          heading={`Search results (${filteredData.length} found)`}
          data={filteredData}
          noDataMessage="No search results found"
        />
      )}
    </>
  );
}
