import { PiTelevisionFill } from "react-icons/pi";
import { MdOutlineMovie } from "react-icons/md";

// Icon mapping for different video types
const Icon = {
  movie: <MdOutlineMovie size={"1.2rem"} />,
  series: <PiTelevisionFill size={"1.2rem"} />,
};

// VideoDetails component displaying information about a video
export default function VideoDetails({ name, type, rating, releaseYear }) {
  return (
    <div className="mt-2 whitespace-nowrap">
      {/* Release year, type, and rating information */}
      <div className="flex items-center justify-start gap-1 text-gray-400 text-xs leading-3">
        <p>{releaseYear}</p>•{/* Type icon and text */}
        <div className="flex items-center">
          {Icon[type]}
          <span className="flex items-center text-center whitespace-nowrap capitalize">
            {type}
          </span>
        </div>
        •<p>{rating}</p>
      </div>
      {/* Video name with text overflow handling */}
      <p className="text-lg truncate" style={{ width: "20ch" }}>
        {name}
      </p>
    </div>
  );
}
