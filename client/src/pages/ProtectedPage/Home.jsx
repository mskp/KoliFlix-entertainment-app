// Importing necessary components and dependencies
import Trending from "./components/Trending";
import SearchBar from "./components/SearchBar";
import { useFetchFeaturedQuery } from "@/redux/api/fetchApi";
import VideosGridLayout from "./components/VideosGridLayout";

// Home component definition
function Home() {
  // Using the useFetchFeaturedQuery hook to fetch featured data
  const { data, isSuccess, isLoading } = useFetchFeaturedQuery();

  // Extracting trending and recommended data from the fetched data
  const trendingData = data?.trending;
  const recommendedData = data?.recommended;

  // JSX rendering
  return (
    <>
      {/* SearchBar component with label and combined movies & series data */}
      <SearchBar
        label={"Movies & Series"}
        data={isSuccess ? [...trendingData, ...recommendedData] : []}
      />

      {/* Trending component displaying trending videos */}
      <Trending isLoading={isLoading} data={trendingData} />

      {/* VideosGridLayout component displaying recommended videos */}
      <VideosGridLayout
        heading={"Recommended for you"}
        isLoading={isLoading}
        data={recommendedData}
      />
    </>
  );
}

// Exporting the Home component as default
export default Home;
