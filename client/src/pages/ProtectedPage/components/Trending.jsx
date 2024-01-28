import VideoDetails from "./VideoDetails";
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
  useAddToBookmarkMutation,
  useRemoveFromBookmarkMutation,
} from "@/redux/api/bookmarkApi";
import toast from "react-hot-toast";

// Trending component displays trending videos with bookmark functionality
export default function Trending({ isLoading, data }) {
  const [addBookmark] = useAddToBookmarkMutation();
  const [removeBookmark] = useRemoveFromBookmarkMutation();
  const navigate = useNavigate();

  // Function to handle adding a video to bookmarks
  const handleAddBookmark = async (id, type) => {
    try {
      await addBookmark({ [type]: id });
      toast.success("Added to bookmark", { id: "bookmark-toast" });
    } catch (error) {
      console.error("Couldn't add to bookmark");
    }
  };

  // Function to handle removing a video from bookmarks
  const handleRemoveBookmark = async (id, type) => {
    try {
      await removeBookmark({ [type]: id });
      toast.error("Removed from bookmark", { id: "bookmark-toast" });
    } catch (error) {
      console.error("Couldn't remove from bookmarks");
    }
  };

  // Loading state, display skeleton UI while loading
  if (isLoading) return <TrendingSkeleton />;

  return (
    <section className="pb-2 mb-6">
      <h2 className="text-2xl">Trending</h2>
      {/* Check if data exists and has items */}
      {data && data.length > 0 ? (
        <ul className="flex flex-nowrap overflow-x-auto gap-2 p-4 pl-0">
          {data.map((current, index) => (
            <li
              key={index}
              className="relative flex-shrink-0 lg:cursor-pointer hover:opacity-90 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 h-full"
            >
              {/* Video thumbnail with click event to navigate to details */}
              <img
                role="button"
                onClick={() => navigate(`/detail/${current._id}`)}
                alt="Movies"
                src={current.thumbnailURL}
                className="bg-gray-300 rounded-lg"
              />
              {/* Bookmark button */}
              {current.isBookmarked ? (
                <button
                  onClick={() =>
                    handleRemoveBookmark(current._id, current.type)
                  }
                  className="absolute top-2 right-2 rounded-full bg-[#000000CC] p-1 hover:bg-[#FFFFFFCC] hover:text-black"
                >
                  <PiBookmarkSimpleFill size={"1.5rem"} />
                </button>
              ) : (
                <button
                  onClick={() => handleAddBookmark(current._id, current.type)}
                  className="absolute top-2 right-2 rounded-full bg-[#000000CC] p-1 hover:bg-[#FFFFFFCC] hover:text-black"
                >
                  <PiBookmarkSimpleBold size={"1.5rem"} />
                </button>
              )}
              {/* Display video details */}
              <VideoDetails
                type={current.type}
                rating={current.rating}
                releaseYear={current.releaseYear}
                name={current.name}
              />
            </li>
          ))}
        </ul>
      ) : (
        // Display message when no data is found
        <p className="text-white text-2xl text-center p-8">No data found</p>
      )}
    </section>
  );
}

// Skeleton UI for Trending component during loading
function TrendingSkeleton({ count = 3 }) {
  return (
    <section className="pb-2 mb-6">
      <div className="skeleton w-48 h-8 rounded-xl" />
      <ul className="flex flex-nowrap overflow-x-auto gap-2 p-4 pl-0">
        {Array.from({ length: count }, (_, index) => (
          <li
            key={index}
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 h-full flex flex-col gap-2"
          >
            <svg
              className="skeleton rounded-lg w-full h-full inset-0"
              viewBox="0 0 16 9"
            ></svg>
            <div className="skeleton skeleton-text w-1/2 h-4 rounded-md" />
            <div className="skeleton skeleton-text w-3/5 h-4 rounded-md" />
          </li>
        ))}
      </ul>
    </section>
  );
}
