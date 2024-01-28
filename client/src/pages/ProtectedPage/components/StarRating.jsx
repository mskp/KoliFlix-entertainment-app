import { TiStarFullOutline, TiStarHalfOutline } from "react-icons/ti";

// StarRating component
const StarRating = ({ rating }) => {
  // Calculating the number of full stars and checking if there's a half star
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Function to render stars based on the rating
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++)
      stars.push(<TiStarFullOutline key={i} />);

    if (hasHalfStar) stars.push(<TiStarHalfOutline key="half" />);
    return stars;
  };

  // JSX rendering of star rating
  return (
    <div className="flex items-center">
      <span className="mr-2 text-2xl">IMDb {rating}</span>
      {renderStars()}
    </div>
  );
};

export default StarRating;
