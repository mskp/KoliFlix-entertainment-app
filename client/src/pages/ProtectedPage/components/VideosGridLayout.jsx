import VideoDetails from "./VideoDetails";
import { PiBookmarkSimpleBold, PiBookmarkSimpleFill } from "react-icons/pi";
import toast from "react-hot-toast";
import {
  useAddToBookmarkMutation,
  useRemoveFromBookmarkMutation,
} from "@/redux/api/bookmarkApi";
import { useNavigate } from "react-router-dom";

export default function VideosGridLayout({
  heading,
  data,
  isLoading = false,
  noDataMessage = "No data found",
}) {
  // Mutations for adding and removing bookmarks
  const [addBookmark] = useAddToBookmarkMutation();
  const [removeBookmark] = useRemoveFromBookmarkMutation();
  const navigate = useNavigate();

  // Function to handle adding a bookmark
  const handleAddBookmark = async (id, type) => {
    try {
      await addBookmark({ [type]: id });
      toast.success("Added to bookmark", { id: "bookmark-toast" });
    } catch (error) {
      console.error("Couldn't add to bookmark");
    }
  };

  // Function to handle removing a bookmark
  const handleRemoveBookmark = async (id, type) => {
    try {
      await removeBookmark({ [type]: id });
      toast.error("Removed from bookmark", { id: "bookmark-toast" });
    } catch (error) {
      console.error("Couldn't remove from bookmarks");
    }
  };

  // Loading state skeleton
  if (isLoading) return <VideoGridSkeleton />;

  return (
    <section>
      <h2 className="text-2xl">{heading}</h2>
      {data && data.length > 0 ? (
        // Render video grid if there's data
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-start py-4">
          {data.map((current, index) => (
            <li
              key={index}
              className="relative lg:cursor-pointer hover:opacity-90 outline-none"
            >
              {/* Thumbnail Image */}
              <img
                role="button"
                onClick={() => navigate(`/detail/${current._id}`)}
                alt={current.name}
                src={current.thumbnailURL}
                className="shadow-lg flex-shrink-0 w-full bg-gray-300 text-center rounded-lg"
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
              {/* Video details component */}
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
        // Display a message when there's no data
        <p className="text-white text-2xl text-center p-8">{noDataMessage}</p>
      )}
    </section>
  );
}

// Skeleton component for loading state
function VideoGridSkeleton({ count = 8 }) {
  return (
    <section>
      {/* Skeleton header */}
      <div className="skeleton w-80 h-8 rounded-xl" />
      {/* Skeleton grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-start py-4">
        {Array.from({ length: count }, (_, index) => (
          <li
            key={index}
            className="bg-opacity-80 rounded-md flex flex-col gap-2"
          >
            {/* Skeleton thumbnail */}
            <svg
              className="skeleton rounded-lg w-full h-full inset-0"
              viewBox="0 0 16 9"
            />
            {/* Skeleton text details */}
            <div className="skeleton skeleton-text w-1/2 h-4 rounded-md" />
            <div className="skeleton skeleton-text w-3/5 h-4 rounded-md" />
          </li>
        ))}
      </ul>
    </section>
  );
}
